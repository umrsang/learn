class TTSPlayer {
  private wsUrl: string;
  private audioContext: AudioContext;
  private ws: WebSocket;
  private reqId: string;
  private text: string;
  private format: string;
  private sampleRate: number;
  private voice: string;
  private volume: number;
  private speechRate: number;
  private pitch: number;
  private language: number;
  private nextStartTime: number = 0;
  private currentSource: AudioBufferSourceNode | null = null;


  constructor(wsUrl: string) {
      this.wsUrl = wsUrl;
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
 
      this.reqId = "3a87fe9793c9-4ebd-95d4-4ce2-a80c054b";
      this.text = '';
      this.format = 'PCM';
      this.sampleRate = 16000;
      this.voice = 'yixiaoling';
      this.volume = 50;
      this.speechRate = 1.1;
      this.pitch = 1.1;
      this.language = 1;

  }

  // 建立WebSocket连接
  async connect() {
      this.ws = new WebSocket(this.wsUrl);
      
      return new Promise<void>((resolve, reject) => {
          this.ws.onopen = () => resolve();
          this.ws.onerror = (error) => reject(error);
      });
  }

  // PCM数据转换为AudioBuffer
  async createAudioBuffer(pcmData: Uint8Array): Promise<AudioBuffer> {
      const sampleRate = 16000;
      const channels = 1;
      
      const audioBuffer = this.audioContext.createBuffer(channels, pcmData.length / 2, sampleRate);
      const channelData = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < pcmData.length / 2; i++) {
          const int16 = (pcmData[i * 2] & 0xff) | ((pcmData[i * 2 + 1] & 0xff) << 8);
          channelData[i] = int16 >= 0x8000 ? -(0x10000 - int16) / 0x8000 : int16 / 0x7fff;
      }
      
      return audioBuffer;
  }

  // 播放音频buffer
  playBuffer(audioBuffer: AudioBuffer) {
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    
    // 如果是第一个音频片段，立即播放
    if (this.nextStartTime === 0) {
      this.nextStartTime = this.audioContext.currentTime;
    }
    
    source.start(this.nextStartTime);
    this.nextStartTime += audioBuffer.duration;
    this.currentSource = source;
    
    return source;
  }

  // 开始语音合成和播放
  async play(text: string) {
    await this.start();

      const request = {
          text: text,
          sample_rate: 16000,
          format: 'PCM',
          req_id: this.reqId,
          voice: this.voice,
          volume: this.volume,
          speech_rate: this.speechRate,
          pitch: this.pitch,
          language: this.language
      };

      this.ws.send(JSON.stringify(request));

      this.nextStartTime = 0; // 重置开始时间

      this.ws.onmessage = async (event) => {
          const response = JSON.parse(event.data);

          if(response.status === 10000 && !response.result){
            // 开始新的音频流，重置状态
            this.resetAudio();
          }
          
          if (response.status === 10000 && response.result) {
              const binary = atob(response.result.audio);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) {
                  bytes[i] = binary.charCodeAt(i);
              }

              const audioBuffer = await this.createAudioBuffer(bytes);
              this.playBuffer(audioBuffer);
          }
      };
  }

  async resetAudio() {
    this.nextStartTime = 0;
    if(this.audioContext && this.audioContext.state === 'running'){
      this.audioContext.close();
      this.audioContext = null;
    }
    this.currentSource = null;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // 开始播放
  async start() {
    if (!this.ws) {
        await this.connect();
    }
  }

  // 停止播放
  stop() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.audioContext.close();
    this.audioContext = null;
    this.currentSource = null;
  }
}

export { TTSPlayer };
