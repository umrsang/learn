<template>
<transition name="fade">
   <div class="page-tips wh pa"> 
      <div class="logo pa"></div>  
     <button class="next btn pa" @click="handleClick"></button>
     <div :class="['role_'+ roleIndex]" class="role pa"></div>
     <div :class="['tips_'+ roleIndex]" class="tips pa"></div>
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
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("step", 4);
    }
  },
  mounted() {}
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
  bottom: 0.8rem;
  left: 5.6rem;
}

.page-tips .role {
  bottom: 0.8rem;
  left: -2.5rem;
  z-index: 200;
}

.tips {
  bottom: 5.6rem;
  right: 0rem;
  width: 6.15rem;
  height: 8.15rem;
  background-size: cover;
  z-index: 100;
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


