interface MessageConfig {
  content: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

class Message {
  private static createMessageElement(config: MessageConfig) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${config.type}`;
    messageDiv.innerHTML = config.content;
    
    // 添加样式
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 16px;
      border-radius: 4px;
      background: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: messageSlideDown 0.3s ease;
    `;

    return messageDiv;
  }

  private static show(config: MessageConfig) {
    const messageElement = this.createMessageElement(config);
    document.body.appendChild(messageElement);

    // 自动移除
    setTimeout(() => {
      messageElement.style.animation = 'messageSlideUp 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 300);
    }, config.duration || 3000);
  }

  static success(content: string, duration?: number) {
    this.show({ content, type: 'success', duration });
  }

  static error(content: string, duration?: number) {
    this.show({ content, type: 'error', duration });
  }

  static warning(content: string, duration?: number) {
    this.show({ content, type: 'warning', duration });
  }

  static info(content: string, duration?: number) {
    this.show({ content, type: 'info', duration });
  }
}

// 添加必要的CSS动画
const style = document.createElement('style');
style.textContent = `
  @keyframes messageSlideDown {
    from {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes messageSlideUp {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
  }

  .ai-message {
    font-size: 14px;
    line-height: 1.5;
  }

  .ai-message-success {
    color: #52c41a;
    border: 1px solid #b7eb8f;
  }

  .ai-message-error {
    color: #ff4d4f;
    border: 1px solid #ffccc7;
  }

  .ai-message-warning {
    color: #faad14;
    border: 1px solid #ffe58f;
  }

  .ai-message-info {
    color: #1890ff;
    border: 1px solid #91d5ff;
  }
`;
document.head.appendChild(style);

export const toast = {
  success: Message.success.bind(Message),
  error: Message.error.bind(Message),
  warning: Message.warning.bind(Message),
  info: Message.info.bind(Message)
};

export default toast;
