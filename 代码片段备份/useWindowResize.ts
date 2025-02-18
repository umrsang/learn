import { onMounted, onUnmounted, ref } from 'vue'

interface Options {
  immediate?: boolean
}

export default function useWindowResize(
  handleResize?: (width: number) => number,
  options: Options = { immediate: true }
) {

  const width = ref(window.innerWidth)

  const handleWindowResize = () => {
    if (handleResize) {
      width.value = handleResize(window.innerWidth)
    } else {
      width.value = window.innerWidth
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleWindowResize)
    options.immediate && handleWindowResize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
  })

  return {
    width
  }
}
