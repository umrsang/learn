
export type Option = {
    authToken?: string;
    keywords?: string[];
    audioOption?: AudioOption;
    onMessageStart?: (message: string) => void;
    onMessageChunk?: (message: string) => void;
    onMessageEnd?: (message: string) => void;
    onKeyWordMatch?: (message: string, match: string) => void;
    onError?: (error: any) => void;
}

type AudioOption = {
    sample_rate: number;
    enable_punctuation: boolean;
    enable_inverse_text_normalization: boolean;
}

export class ASRService {
    private wsUrl: string;
    private keywords: string[];
    private req_id: string;
    private rec_status: number;
    private audioOption: AudioOption;
    private total_text: string;
    private socket: WebSocket;
    private option: Option;

    constructor(wsUrl:string, option:Option) {
        this.wsUrl = wsUrl;
        this.req_id = "aae36140-bc13-441f-81f9-6700fe7a5e96"; // 请求全局唯一 ID
        this.rec_status = 0; // 0：开始识别；1：发送语音流；2：结束语音流
        this.audioOption = {
            "sample_rate": 16000,
            "enable_punctuation": true,
            "enable_inverse_text_normalization": true,
            ...option.audioOption
        };
        this.total_text = ""; // 存储最终识别结果
        this.option = option;
    }

    async init() {
        this.socket = new WebSocket(this.wsUrl);

        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }

    onOpen() {
        console.log('WebSocket连接已建立');
        this.sendStartRecognitionMessage();
    }

    onMessage(event) {
        const data = event.data;
        // console.log("====================================");

        // console.log('收到消息:', data);
        const response = JSON.parse(data);
        // console.log('解析后的响应:', response);

        if ('res_status' in response) {
            const textChunk = response.data?.results[0]?.text;
            const status = response.res_status;
            this.total_text = textChunk ? textChunk : "";
            console.log({
                "片段": textChunk,
                "状态": ["开始", "有效语音", "处理中", "句子结束", "触发唤醒词"][status],
                "识别结果": this.total_text,
                "状态值": status
            });
            
            if (status === 1) {
                this.option.onMessageStart && this.option.onMessageStart(textChunk);
                console.log('识别开始:', status);
            } else if (status === 2) {
                this.option.onMessageChunk && this.option.onMessageChunk(textChunk);
            } else if (status === 3) {
                const keywordMatch = this.isKeyWord(textChunk);
                if(keywordMatch){
                    // alert("触发唤醒词"+this.keywords)
                    this.option.onKeyWordMatch && this.option.onKeyWordMatch(textChunk, keywordMatch);
                    // this.stopRecognition();
                }
                this.option.onMessageEnd && this.option.onMessageEnd(textChunk);
                // this.stopRecognition(); // 在识别结束后停止识别+5
            } else if (status === 0) {
                console.log('开始识别:', status);
            } else {
                console.log('非识别结果状态:', status);
            }
        }

        console.log("====================================");
    }

    isKeyWord(text:string){
        const keywords = this.option.keywords || this.keywords || [];
        const match = keywords.find(keyword => text.includes(keyword));
        if(match){
            console.log("匹配到唤醒词",match);
        }
        return match;
    }

    onClose() {
        console.log('WebSocket连接已关闭');
    }

    onError(error) {
        this.option.onError && this.option.onError(error);
        console.error('WebSocket错误:', error);
    }

    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
            // console.log('已发送消息:', message);
        } else {
            const readyStateText = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][this.socket.readyState] || 'UNKNOWN';
            console.error('WebSocket连接未建立,当前状态:', this.socket.readyState, readyStateText);
        }
    }

    sendStartRecognitionMessage() {
        const message = {
            req_id: this.req_id,
            rec_status: this.rec_status,
            option: this.audioOption
        };
        this.sendMessage(message);
        console.log('已发送开始识别请求:', message);
    }

    async sendAudioStream(base64Audio) {
        this.rec_status = 1; // 发送语音流
        const message = {
            req_id: this.req_id,
            rec_status: this.rec_status,
            audio_stream: base64Audio
        };
        this.sendMessage(message);
        // console.log('已发送语音流:', message);
    }

    stopRecognition() {
        // 添加停止识别的方法
        this.rec_status = 2; // 结束语音流
        const endMessage = {
            req_id: this.req_id,
            rec_status: this.rec_status
        };
        this.sendMessage(endMessage);
        console.log('已发送结束语音流请求:', endMessage);
        this.socket.close();
        console.log('已停止识别');
    }
}