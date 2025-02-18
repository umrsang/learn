import { ASRService, type Option } from "./asr-service.js";

type AsrOption = Option & { 
    onVolumeChange?: (volume: number) => void 
};

class AsrSdk{
    private wsUrl: string;
    private option: Option;
    private audioContext: AudioContext | null;
    private processor: ScriptProcessorNode | null;
    private source: MediaStreamAudioSourceNode | null;
    private asrService: ASRService | null;
    private audioDataQueue: Float32Array[];

    constructor(wsUrl: string, option: AsrOption) {
        this.wsUrl = wsUrl;
        this.option = option;
        this.audioContext=null;
        this.processor= null;
        this.source=null;
        this.asrService= null;
        this.audioDataQueue = [];
    }
    async start(){
        try {
            // 获取音频流
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new AudioContext({ sampleRate: 16000 });
            this.source = this.audioContext.createMediaStreamSource(stream);
            this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

            this.asrService = new ASRService(this.wsUrl, {
                ...this.option,
                onError: (error) => {
                    this.stop();
                }
            });
            await this.asrService.init();

            this.processor.onaudioprocess = event => {
                const inputBuffer = event.inputBuffer;
                const outputBuffer = new Float32Array(inputBuffer.length);
                let sum = 0;

                for (let i = 0; i < inputBuffer.length; i++) {
                    outputBuffer[i] = inputBuffer.getChannelData(0)[i];
                    sum += Math.abs(outputBuffer[i]); // 计算音频数据绝对值之和
                }

                // 计算平均音量
                const avgVolume = sum / inputBuffer.length;
                console.log('当前音量:', avgVolume.toFixed(4));
                this.option.onVolumeChange && this.option.onVolumeChange(avgVolume);

                this.audioDataQueue.push(...outputBuffer);

                const wavBuffer = this.encodeWAV(this.audioDataQueue, this.audioContext.sampleRate);
                const audioBlob = new Blob([wavBuffer], { type: 'audio/wav' });

                audioBlob.arrayBuffer().then(arrayBuffer => {
                    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                    this.asrService.sendAudioStream(base64Audio);
                    this.audioDataQueue = [];
                });
            };

            this.source.connect(this.processor);
            this.processor.connect(this.audioContext.destination);

        } catch (error) {
            console.error('开始录制出错：', error);
            this.stop();
            throw error;
        }
    }
    encodeWAV(samples, sampleRate) {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        function writeString(view, offset, string) {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);

        let offset = 44;
        for (let i = 0; i < samples.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }

        return view;
    }
    stop(){
        if (this.processor) {
            this.processor.disconnect();
            this.processor.onaudioprocess = null;
        }
        if (this.source) {
            this.source.disconnect();
        }
        if (this.audioContext && this.audioContext.state === 'running') {
            this.audioContext.close();
        }
        if (this.asrService) {
            this.asrService.stopRecognition();
        }
    }
    save(){
        const wavBuffer = this.encodeWAV(this.audioDataQueue, this.audioContext.sampleRate);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.wav';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
export {AsrSdk};