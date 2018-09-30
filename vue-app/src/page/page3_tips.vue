<template>
    <transition name="fade">
        <div class="page-tips wh pa"> 
                <div class="logo pa"></div>  
            <button class="next btn pa" @click="handleClick"></button>
            <transition name="slideInLeft">
                <div :class="['role_'+ roleIndex]" class="role pa" v-show="display"></div>
            </transition>
            <transition name="slideInRight">
                <div :class="['tips_'+ roleIndex]" class="tips pa" v-show="display"></div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
  name: "tips",
  props: {
    roleIndex: String
  },
  data() {
    return {
      display: false
    };
  },
  methods: {
    handleClick() {
      this.$emit("step", 4);
    }
  },
  mounted() {
    this.display = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-tips {
  top: 0;
  left: 0;
  background: url(../assets/img/step_3_bg.jpg);
  background-size: cover;
  overflow: hidden;
}

.page-tips .next {
  margin-left: 0;
  bottom: 0.8rem;
  right: 0.5rem;
  left: initial;
}

.role {
  top: 1.5rem;
  left: -2.5rem;
  z-index: 100;
}

.tips {
  top: 4rem;
  right: 0rem;
  width: 6.15rem;
  height: 8.15rem;
  background-size: cover;
  z-index: 200;
	transform: scale(1) rotate(5deg);
}

.tips_1 {
  background-image: url(../assets/img/tips_1.png);
}
.tips_2 {
  background-image: url(../assets/img/tips_2.png);
}
.tips_3 {
  background-image: url(../assets/img/tips_3.png);
}
.tips_4 {
  background-image: url(../assets/img/tips_4.png);
}
</style>


