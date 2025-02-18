<template>
  <div ref="container" class="smart-tag-infinite-scroll">
    <slot :data="data" :loading="loading" :loadEnd="loadEnd"></slot>
    <p :class="{ active: loading }">
      <span v-if="loadEnd">加载完毕</span>
      <slot v-else-if="loading" name="loading">
        <Spin class="spin" :class="{ 'spin-height': !data.length }" size="large" />
      </slot>
    </p>
  </div>
</template>

<script lang="ts" setup>

import { nextTick, watch } from 'vue';
import { Spin, Empty } from 'ant-design-vue'
import { ref, onMounted, onBeforeUnmount, type Ref, reactive } from 'vue'

interface ScrollParams {
  loadmore: (data: { pageIndex: number }) => Promise<any[]>
  distance?: number,
  immediate: boolean
}

const props = withDefaults(defineProps<ScrollParams>(), { immediate: true })

const container = ref()
const loading = ref(false)
const loadEnd = ref(false)
const data = ref<any[]>([])

const page = reactive({
  pageIndex: 1,
})


const handleScroll = () => {
  if (loading.value) return
  const { scrollTop, clientHeight, scrollHeight } = container.value
  if (scrollTop + clientHeight >= scrollHeight - (props.distance || 10)) {
    loadMore()
  }
}

const emit = defineEmits(['loading-change'])
watch(() => loading.value, () => {
  emit('loading-change', loading.value)
})


const loadMore = async () => {
  if (loadEnd.value) return
  loading.value = true

  try {
    const res = await props.loadmore(page)
    if (!res || !res.length) {
      loadEnd.value = true
    } else {
      data.value = [...data.value, ...res]
    }
    page.pageIndex++
    if (!isFullHeight() && !loadEnd.value) {
      loadMore()
    }
  } finally {
    loading.value = false
  }
}

const isFullHeight = () => {
  return container.value.scrollHeight > container.value.offsetHeight
}

const reload = async () => {
  await clean()
  loadMore()
}

const clean = async () => {
  page.pageIndex = 1
  loadEnd.value = false
  loading.value = false
  data.value = []
  await nextTick()
  container.value.scrollTop = 0
}


const getData = () => {
  return data.value || []
}

defineExpose({
  reload,
  clean,
  getData
})

onMounted(() => {
  props.immediate && loadMore()
  container.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  container.value.removeEventListener('scroll', handleScroll)
})

</script>

<style lang="less" scoped>
.smart-tag-infinite-scroll {
  position: relative;

  &> :deep(.inner) {
    min-height: 80%;
  }

  p {
    text-align: center;
    color: #ffffff94;
    font-size: 16px;
    margin: 10px 0 50px 0;
    transition: 0.3s;
  }

  .spin-height {
    position: absolute;
    left: 50%;
    top: 48%;
    margin-left: -20px;
  }

}
</style>
