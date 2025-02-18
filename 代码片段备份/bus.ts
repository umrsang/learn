export const eventTypes = {
  pageChange: 'page-change', // 页码改变
  mapMarkClick: 'map-mark-click', // 地图标记点击
  videoClick: 'video-click', // 视频点击
  mapZoom: 'map-zoom', // 地图缩放
} as const; // 使用 as const 让类型更精确

// 定义事件类型
type EventType = typeof eventTypes[keyof typeof eventTypes];
type EventCallback = (...args: any[]) => void;

class EventBus {
  private events: Map<EventType, Map<symbol | string, EventCallback>>;
  private readonly id: string;

  constructor() {
    this.events = new Map();
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // 订阅事件
  on(eventName: EventType, callback: EventCallback, id?: string): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Map());
    }
    const callbacks = this.events.get(eventName)!;
    const eventId = id || Symbol();
    
    // 如果已存在相同id的监听器，将会被新的覆盖
    callbacks.set(eventId, callback);
  }

  // 取消订阅
  off(eventName: EventType, callbackOrId?: EventCallback | string): void {
    if (!this.events.has(eventName)) return;
    
    const callbacks = this.events.get(eventName);
    if (typeof callbackOrId === 'string') {
      // 如果传入的是id，直接删除对应的回调
      callbacks.delete(callbackOrId);
    } else if (typeof callbackOrId === 'function') {
      // 如果传入的是回调函数，遍历查找并删除
      callbacks.forEach((cb, key) => {
        if (cb === callbackOrId) {
          callbacks.delete(key);
        }
      });
    } else {
      // 如果没有提供参数，则移除该事件的所有订阅
      this.events.delete(eventName);
    }

    // 如果没有回调了，删除整个事件
    if (callbacks.size === 0) {
      this.events.delete(eventName);
    }
  }

  // 触发事件
  emit(eventName: EventType, ...args: any[]): void {
    if (!this.events.has(eventName)) {
      console.warn(`Event ${eventName} is not defined`, this.events);
      return;
    }
    // 获取事件对应的回调Map，并执行所有回调
    const callbacks = this.events.get(eventName);
    callbacks.forEach((callback) => {
      callback(...args);
    });
  }

  // 编辑器事件
  editorEvent(eventName: EventType, eventData: any): void {
    this.checkEventName(eventName);
    this.emit('editor-event' as EventType, eventName, eventData);
  }

  // 只订阅一次
  once(eventName: EventType, callback: EventCallback): void {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  // 清除所有事件
  clear(): void {
    this.events.clear();
  }

  private checkEventName(eventName: EventType): void {
    const match = Object.values(eventTypes).find(key => key === eventName);
    if (!match) {
      throw new Error(`Event type ${eventName} is not defined`);
    }
  }
}

// 导出事件总线实例
export const eventBus = new EventBus();
export default EventBus;