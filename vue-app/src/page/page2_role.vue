<template>
<transition name="fade">
   <div class="page-role wh pa"> 
      <div class="logo pa"></div>  
     <button class="next btn pa" @click="handleClick"></button>
     <button class="toggle toggle_l btn pa" @click="handleToggle('toggleNext')"></button>
     <button class="toggle toggle_r btn pa" @click="handleToggle('togglePev')"></button>
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
    return {
      roleSwiper: {}
    };
  },
  methods: {
    handleClick() {
      this.$emit("setRole", Swiper.activeSlider);
      this.$emit("step", 3);
    },
    handleToggle(prop) {
      this.roleSwiper[prop]()
    }
  },
  mounted() {
    var me = this;
    this.$nextTick(() => {
      var swiper = this.$refs.swiper;
      me.roleSwiper = Swiper.init({
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
  background: url(../assets/img/step_2_bg.jpg);
  background-size: cover;
  overflow: hidden;
}
.toggle {
  top: 8.8rem;
  width: 1.18rem;
  height: 1.31rem;
  background: url(../assets/img/arrow.png);
  background-size: cover;
  z-index: 400;
}
.toggle_l {
  left: 0.2rem;
}
.toggle_r {
  right: 0.2rem;
  transform: scaleX(-1)
}
.swiper {
  margin-top: -1rem;
  width: 100%;
  height: 18rem;
  overflow: hidden;
}
.slider {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: #f60;
  color: #fff;
}
.cover {
  filter: brightness(0.5);
  -webkit-filter: brightness(0.5);
  -o-filter: brightness(0.5);
  /* opacity: 0.8; */
}
</style>



