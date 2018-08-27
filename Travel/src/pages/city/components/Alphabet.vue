<template>
  <ul class="list">
    <li
      class="item"
      v-for="item in letters"
      :key="item"
      :ref="item"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters // 返回的结果大概就是['A', 'B']
    }
  },
  data () {
    return {
      touchStatus: false, // 定义一个标识类
      startY: 0,
      timer: null
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop // offsetTop是首字母A距离.list元素顶部的距离
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText) // 向外触发事件，由city组件监听
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer) // 函数节流进行性能优化
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          // console.log(e.touches[0].clientY)
          console.log('touchY', touchY)
          const index = Math.floor((touchY - this.startY) / 20)// 这里的20是每个字母的高度
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index]) // 向父元素触发change事件
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .list                         //前三项样式是为了垂直居中
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
</style>
