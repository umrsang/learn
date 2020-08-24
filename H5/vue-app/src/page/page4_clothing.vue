<template>
<transition name="fade">
   <div class="page-clothing wh pa"> 
        <div class="logo pa"></div>  
        <div class="cover pa wh "></div>  
        <div class="main_role pa "></div> 
        <button class="go btn pa" @click="handleGo"></button>
        <div class="button_bg pa"></div>
        <div class="btn_type pa">
            <button class="btn pa btn_lianyiqun" @click="handleClick"></button>
            <button class="btn pa btn_shipin" @click="handleClick"></button>
            <button class="btn pa btn_toufa" @click="handleClick"></button>
            <button class="btn pa btn_xiezi " @click="handleClick"></button>
            <button class="btn pa btn_zhuangrong " @click="handleClick"></button>
        </div>
   </div>
</transition>
</template>

<script>
export default {
  name: "clothing",
  props: {},
  data() {
    return {
      
    };
  },
  methods: {
    handleGo() {
      this.$emit("step", 5);
    },
    handleClick() {
      //   this.$emit("step", 5);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.page-clothing {
  top: 0;
  left: 0;
  background: url(../assets/img/step_4_bg2.jpg);
  background-size: cover;
  overflow: hidden;
}

.page-clothing .cover {
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.3); */
  overflow: hidden;
}

.page-clothing .main_role {
  top: 2.4rem;
  left: 0.5rem;
  width: 6.02rem;
  height: 14.89rem;
  background: url(../assets/img/underwear1.png);
  background-size: cover;
}

.go {
  bottom: 0.5rem;
  left: 0.3rem;
  width: 3.43rem;
  height: 2.1rem;
  background: url(/img/go.8ca99376.png);
  background-size: cover;
  z-index: 1000;
}

.button_bg {
  top: 0rem;
  right: 0rem;
  width: 3.1rem;
  height: 100%;
  background: url(../assets/img/cebian.png);
  background-size: cover;
  z-index: 0;
}

.btn_type {
width: 4.1rem;
    height: 15rem;
    top: 0;
    right: 0rem;
}

.btn_type .btn {
  width: 1.15rem;
  height: 1.2rem;
  left: 0rem;
  background-size: cover;
  overflow: hidden;
}

.btn_toufa {
  top: 2rem;
  background: url(../assets/img/btn_toufa.png);
}
.btn_zhuangrong {
  top: 3.7rem;
  background: url(../assets/img/btn_zhuangrong.png);
}
.btn_lianyiqun {
  top: 5.4rem;
  background: url(../assets/img/btn_lianyiqun.png);
}
.btn_xiezi {
  top: 7.1rem;
  background: url(../assets/img/btn_xiezi.png);
}
.btn_shipin {
  top: 8.8rem;
  background: url(../assets/img/btn_shipin.png);
}
</style>
