import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export default function useColumnSize(
  containerRef: Ref,
  targetWidth: number,
  gutter: number,
  aspectRatio: number
) {
  const width = ref(0)
  const height = ref(0)
  const style = ref({ width: '', height: '' })
  gutter = gutter + 1

  const handleResize = () => {
    if (containerRef.value) {
      const computedStyle = window.getComputedStyle(containerRef.value)
      const padding =
        parseInt(computedStyle.paddingLeft || 0) + parseInt(computedStyle.paddingRight || 0)
      // 减去padding和滚动条
      const containerWidth = containerRef.value.offsetWidth - padding - 8
      // 列宽是单个宽度加间距
      let columnWidth = targetWidth + gutter
      // 多少列
      let columns = Math.floor(containerWidth / columnWidth)
      // 取余数 看剩下多少宽度
      const remainWidth = containerWidth % columnWidth

      // 大于百分比的话 加一列上去
      if (remainWidth > (columnWidth * (0.5))) {
        columns = columns + 1
      }
      // 每列宽度
      columnWidth = Math.floor(containerWidth / columns)
      // 高度
      const finalHeight = (columnWidth - gutter) / aspectRatio

      width.value = columnWidth - gutter
      height.value = finalHeight

      style.value.width = width.value + 'px'
      style.value.height = height.value + 'px'
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { width, height, style }
}
