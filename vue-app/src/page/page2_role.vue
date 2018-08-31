<template>
<transition name="fade">
   <div class="page-role wh pa"> 
      <div class="logo pa"></div>  
     <button class="next btn pa" @click="handleClick"></button>
     <div class="swiper pa" ref="swiper">
        <div class="role role_1 pa " data-index="1"></div>
        <div class="role role_2 pa " data-index="2"></div>
        <div class="role role_3 pa " data-index="3"></div>
        <div class="role role_4 pa " data-index="4"></div>
     </div>
   </div>
</transition>
</template>

<script>
import Swiper from "../components/swiper.js";

export default {
  rules: {
    "no-console": "off"
  },
  name: "role",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("setRole", Swiper.activeSlider);
      this.$emit("step", 3);
    }
  },
  mounted() {
    this.$nextTick(() => {
      var swiper = this.$refs.swiper;
      Swiper.init({
        container: swiper
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-role {
  top: 0;
  left: 0;
  background: url(../assets/img/2.jpg);
  background-size: cover;
  overflow: hidden;
}
.swiper {
  width: 100%;
  height: 17rem;
}
.slider {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: #f60;
  color: #fff;
}
.cover {
  -webkit-filter: brightness(0.5);
  /* -o-filter: brightness(0.5); */
  opacity: 0.8;
}
</style>



