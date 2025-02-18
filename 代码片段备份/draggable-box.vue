<template>
  <div 
    ref="container"
    class="draggable-box"
    :class="{
      'is-space-pressed': !requireKeyToControl || isSpacePressed || isCtrlPressed,
      'is-dragging': isDragging
    }"
    :style="{
      transform: `translate(${position.x}px, ${position.y}px) scale(${effectiveZoom})`,
      transformOrigin: 'center center',
      cursor: (!requireKeyToControl || isSpacePressed || isCtrlPressed) ? 'grab' : 'default'
    }"
    :title="requireKeyToControl ? '按住空格键或Ctrl键拖动、按住ctrl+滚轮缩放' : '直接拖动、按住ctrl+滚轮缩放'"
  >
    <!-- 拖拽覆盖层 防止子元素被拖拽-->
    <div 
      v-show=" isSpacePressed || isCtrlPressed"
      class="drag-overlay"
      @mousedown="startDrag"
    ></div>
    <!-- 渲染组件 -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DraggableBox',
  props: {
    offsetY: {
      type: Number,
      default: 0
    },
    zoom: {
      type: Number,
      required: true
    },
    zoomList: {
      type: Array,
      default: () => Array.from({ length: 39 }, (_, i) => (i + 2) * 0.05), // 缩放比例列表
    },
    padding: {
      type: Number,
      default: 0
    },
    requireKeyToControl: {
      type: Boolean,
      default: false  // 默认需要按键控制
    }
  },
  data() {
    return {
      position: {
        x: 0,
        y: 0
      },
      isDragging: false,
      startPos: {
        x: 0,
        y: 0
      },
      isSpacePressed: false,
      containerWidth: 0,
      containerHeight: 0,
      contentWidth: 0,
      contentHeight: 0,
      isCtrlPressed: false,
    }
  },
  computed: {
    fixedZoom() { // 自适应缩放比例
      if (!this.containerWidth || !this.containerHeight || !this.contentWidth || !this.contentHeight) return 1;
      const padding = this.padding  * 2; // 一个方向是左加右 即*2
      const widthRatio = (this.containerWidth - padding) / this.contentWidth;
      const heightRatio = (this.containerHeight - padding) / this.contentHeight;
      return Math.min(widthRatio, heightRatio);
    },
    effectiveZoom() { // 实际使用的缩放比例
      return this.zoom === -1 ? this.fixedZoom : this.zoom;
    },
    initialPosition() {
      return {
        x: 0,
        y: this.offsetY || 0
      };
    }
  },
  mounted() {
    this.resetPosition()
    window.addEventListener('keydown', this.handleKeyDown); // 监听空格键
    window.addEventListener('keyup', this.handleKeyUp); // 监听空格键
    this.updateContainerSize();
    window.addEventListener('resize', this.handleResize); // 监听窗口大小变化
    if (this.$refs.container && this.$refs.container.parentElement) {
      this.$refs.container.parentElement.addEventListener('wheel', this.handleWheel, { passive: false });
    }
  },
  methods: {
    handleKeyDown(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        this.isSpacePressed = true;
      }
      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        this.isCtrlPressed = true;
      }
    },
    handleKeyUp(e) {
      if (e.code === 'Space') {
        this.isSpacePressed = false;
      }
      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        this.isCtrlPressed = false;
      }
      if (!this.isSpacePressed && !this.isCtrlPressed) {
        this.stopDrag();
      }
    },
    startDrag(e) { // 开始拖拽
      if (this.requireKeyToControl && !this.isSpacePressed && !this.isCtrlPressed) return;
      
      this.isDragging = true;
      this.startPos = {
        x: e.clientX - this.position.x,
        y: e.clientY - this.position.y
      };

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(e) {
      if (!this.isDragging || (this.requireKeyToControl && !this.isSpacePressed && !this.isCtrlPressed)) return;
      
      this.position = {
        x: e.clientX - this.startPos.x,
        y: e.clientY - this.startPos.y
      };
    },
    stopDrag() { // 停止拖拽
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    resetPosition() { // 重置位置 上层调用
      this.position = { x: 0, y: this.offsetY || 0 };
      this.$emit('update:zoom', -1);
    },
    zoomIn() { // 放大 上层调用
      this.handleZoom('in');
    },
    zoomOut() { // 缩小 上层调用
      this.handleZoom('out');
    },
    updateContainerSize() { // 更新容器尺寸 上层调用
      if (!this.$refs.container) return;
      
      // 使用父元素的尺寸作为容器尺寸
      const parentElement = this.$refs.container.parentElement;
      this.containerWidth = parentElement.clientWidth;
      this.containerHeight = parentElement.clientHeight;
      
      // 使用组件根元素获取内容尺寸
      this.contentWidth = this.$el.offsetWidth;
      this.contentHeight = this.$el.offsetHeight;
    },
    handleZoom(type) { // 缩放
      let baseZoom = this.zoom;
      
      if (baseZoom + '' === '-1') { // 自适应缩放
        // 在zoomList中找到比fixedZoom大的最小值，或者比fixedZoom小的最大值 即最接近的一档
        baseZoom = type === 'in' 
          ? this.zoomList.find(zoom => zoom > this.fixedZoom) 
          : [...this.zoomList].reverse().find(zoom => zoom < this.fixedZoom);
        this.$emit('update:zoom', baseZoom || this.zoomList[type === 'in' ? this.zoomList.length - 1 : 0]);
        return;
      }
      
      const index = this.zoomList.indexOf(baseZoom);
      const newIndex = type === 'in'  
        ? Math.min(index + 1, this.zoomList.length - 1) 
        : Math.max(index - 1, 0);
      this.$emit('update:zoom', this.zoomList[newIndex]);
    },
    handleWheel(e) {
      if (this.requireKeyToControl && !e.ctrlKey) return;
      e.preventDefault();
      this.handleZoom(e.deltaY < 0 ? 'in' : 'out');
    },
    handleResize() {
      this.updateContainerSize();
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleResize);
    if (this.$refs.container && this.$refs.container.parentElement) {
      this.$refs.container.parentElement.removeEventListener('wheel', this.handleWheel);
    }
  }
}
</script>

<style lang="less" scoped>
.draggable-box {
  position: relative;
  user-select: none;
  transform-origin: center center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  cursor: default;
  
  &.is-dragging {
    transition: none;
  }
  
  &.is-space-pressed {
    cursor: grab;
  }
}

.drag-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
