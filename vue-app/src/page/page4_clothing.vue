<template>
<transition name="fade">
   <div class="page-clothing wh pa"> 
        <div class="logo pa"></div>  
        <div class="cover pa wh "></div>  
        <div class="main_role pa "></div> 
        <button class="go btn pa" @click="handleGo"></button>
        <div class="clothing_btn pa">
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
    return {};
  },
  methods: {
    handleGo() {
      //   this.$emit("step", 5);
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

.page-clothing .clothing_btn {
  width: 5.2rem;
  height: 15rem;
  top: 0;
  right: 0rem;
}

.page-clothing .clothing_btn .btn {
  width: 3.72rem;
  height: 1.54rem;
  right: 0.76rem;
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
  top: 2.9rem;
  left: 0.5rem;
  width: 6.02rem;
  height: 14.89rem;
  background: url(../assets/img/underwear1.png);
  background-size: cover;
}

.go {
  bottom: 0.8rem;
  right: 0.3rem;
  width: 5.16rem;
  height: 2.97rem;
  background: url(../assets/img/go.png);
  background-size: cover;
  z-index: 1000;
}

.btn_toufa {
  top: 4rem;
  background: url(../assets/img/btn_toufa.png);
}
.btn_zhuangrong {
  top: 6rem;
  background: url(../assets/img/btn_zhuangrong.png);
}
.btn_lianyiqun {
  top: 8rem;
  background: url(../assets/img/btn_lianyiqun.png);
}
.btn_xiezi {
  top: 10rem;
  background: url(../assets/img/btn_xiezi.png);
}
.btn_shipin {
  top: 12rem;
  background: url(../assets/img/btn_shipin.png);
}
</style>
