<template>
<transition name="fade">
   <div class="page-role wh pa"> 
     <!-- <button class="go btn pa" @click="handleClick"></button> -->
     <div class="swiper pa" ref="swiper">
         <div class="slider" ></div>
         <div class="slider" ></div>
         <div class="slider" ></div>
         <div class="slider" ></div>
         <div class="slider" ></div>
     </div>
     <!-- <div class="role role_1 pa pos-l"></div>
     <div class="role role_2 pa pos-b"></div>
     <div class="role role_3 pa pos-c"></div>
     <div class="role role_4 pa pos-r"></div> -->
   </div>
</transition>
</template>

<script>
export default {
  name: "role",
  props: {
    msg: String
  },
  data() {
    return {
      slider: 5,
      len: 0,
      sY: 1,
      radius: 0,
      containerX: 0,
      containerY: 0
    };
  },
  methods: {
    handleClick() {
      this.$emit("step", 3);
    },
    swiperInit() {
      var slider = this.slider;
      var PI = Math.PI;
      // var len = 2*PI*
    }
  },
  mounted() {
    this.$nextTick(() => {
      var swiper = this.$refs.swiper;
      this.containerX = swiper.offsetWidth;
      this.containerY = swiper.offsetHeight;
      console.log(swiper)
      console.log(this.containerX, this.containerY);
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
  height: 15rem;
}
.slider {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: #333;
  color: #fff;
}

.go {
  bottom: 0.8rem;
  left: 3rem;
  width: 4.8rem;
  height: 2.77rem;
  background: url(../assets/img/go.png);
  background-size: cover;
}
.role {
  width: 10.77rem;
  height: 15.48rem;
  background-size: cover;
  transition: all 0.5s;
}
.role_1 {
  background-image: url(../assets/img/role_1.png);
}
.role_2 {
  background-image: url(../assets/img/role_2.png);
}
.role_3 {
  background-image: url(../assets/img/role_3.png);
}
.role_4 {
  background-image: url(../assets/img/role_4.png);
}
.pos-c {
  left: 0;
  top: 2rem;
  z-index: 30;
}
.pos-l {
  left: -40%;
  top: 1rem;
  z-index: 20;
  transform: scale(0.7);
}
.pos-r {
  right: -40%;
  top: 1rem;
  z-index: 20;
  transform: scale(0.7);
}
.pos-b {
  left: 0;
  top: -2rem;
  z-index: 10;
  transform: scale(0.6);
}

span {
  color: #fff;
}
</style>
