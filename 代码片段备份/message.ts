interface ToastOptions {
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
}

class Toast {
  private container: HTMLDivElement | null = null;

  constructor() {
    this.createContainer();
  }

  private createContainer() {
    if (typeof document === 'undefined') return;
    
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
    `;
    document.body.appendChild(this.container);
  }

  show(content: string, options: ToastOptions = {}) {
    const { duration = 3000, type = 'info' } = options;
    
    const toast = document.createElement('div');
    toast.style.cssText = `
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      animation: fadeIn 0.3s;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
      min-width: 200px;
    `;

    // 添加图标
    const icon = document.createElement('span');
    icon.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border-radius: 50%;
      color: white;
      font-size: 12px;
      line-height: 1;
      font-weight: bold;
      font-family: Arial;
      padding-top: 2px;
    padding-left: 2px;
    `;

    // 修改图标样式和内容
    switch (type) {
      case 'success':
        icon.style.background = '#52c41a';
        icon.innerHTML = '✓';
        icon.style.paddingTop = '1px';
        break;
      case 'error':
        icon.style.background = '#ff4d4f';
        icon.innerHTML = '×';
        icon.style.paddingTop = '1px';
        break;
      case 'warning':
        icon.style.background = '#faad14';
        icon.innerHTML = '!';
        icon.style.paddingTop = '1px';
        break;
      case 'info':
        icon.style.background = '#1890ff';
        icon.innerHTML = 'i';
        icon.style.paddingBottom = '1px';
        break;
    }

    toast.appendChild(icon);
    toast.appendChild(document.createTextNode(content));
    this.container?.appendChild(toast);

    // 自动移除
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s';
      setTimeout(() => {
        this.container?.removeChild(toast);
      }, 300);
    }, duration);
  }

  success(content: string, duration?: number) {
    this.show(content, { type: 'success', duration });
  }

  error(content: string, duration?: number) {
    this.show(content, { type: 'error', duration });
  }

  warning(content: string, duration?: number) {
    this.show(content, { type: 'warning', duration });
  }

  info(content: string, duration?: number) {
    this.show(content, { type: 'info', duration });
  }
}

// 添加动画样式
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
}

export const toast = new Toast();
export default toast;
