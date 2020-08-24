<template>
    <transition name="fade">
      <div class="page-result wh pa"> 
          <div class="logo pa"></div> 
          <transition name="result">     
            <div class="result-box pa" v-show="ondisplay">
              <div class="light pa"></div>
              <div class="result pa">
                <div class="heart-box  pa">
                  <transition name="bounce">    
                    <div class="heart heart_1" v-show="ondisplay>1"></div>
                  </transition>
                  <transition name="bounce">    
                    <div class="heart heart_2" v-show="ondisplay>2"></div>
                  </transition>
                  <transition name="bounce">    
                    <div class="heart heart_3" v-show="ondisplay>3"></div>
                  </transition>
                </div>
                <span>恭喜你获得{{name[roleIndex]}}的满满 的好感！ {{name[roleIndex]}}还透露了 一个他的小秘密！ </span>
              </div>
            </div>
          </transition> 
          <transition name="role">
            <div  :class="['role_'+ roleIndex]" v-show="ondisplay" class="role pa"></div>
          </transition>
          <transition name="word"> 
            <div :class="['word_'+ roleIndex]"  v-show="ondisplay" class="word pa"></div>
          </transition>
          <transition name="up">
            <button class="download btn pa"  v-show="ondisplay" ></button>
          </transition>
      </div>
    </transition>
</template>

<script>
export default {
  name: "result",
  props: {
    roleIndex: String
  },
  data() {
    return {
      ondisplay: false,
      name: ["", "警卫队长阿伦", "琪薇小姐", "奥利奴公爵", "子坎公爵"]
    };
  },
  methods: {
    handleGo() {
      //   this.$emit("step", 5);
    },
    handleClick() {
      //   this.$emit("step", 5);
    }
  },
  mounted() {
    var me = this;
    var timer = setInterval(function(){
      me.ondisplay += 1;
      if(me.ondisplay > 10){
        clearInterval(timer)
      }
    }, 400)
  }
};
</script>

<style scoped>
.page-result {
  top: 0;
  left: 0;
  background: url(../assets/img/step_5_bg.jpg);
  background-size: cover;
  overflow: hidden;
}

.role {
  top: 1.5rem;
  right: -2rem;
  z-index: 100;
}
/* transition */
.role-enter-active {
  transition: all 0.5s;
}
.role-enter,
.role-leave-to {
  transform: translateX(5rem)
}/* transition */
.result-enter-active {
  transition: all 0.5s;
}
.result-enter,
.result-leave-to {
  transform: translateY(-5rem)
}
/* transition */
.word-enter-active {
  transition: all 0.5s;
}
.word-enter,
.word-leave-to {
  transform: translateX(-5rem)
}

/* transition */
.up-enter-active {
  transition: all 0.5s;
  animation: none !important;
}
.up-enter,
.up-leave-to {
  opacity: 0;
  transform: translateY(2rem)
}


.download {
  bottom: 1.5rem;
  left: 0.71rem;
  width: 9.57rem;
  height: 2.44rem;
  background: url(../assets/img/download.png);
  background-size: cover;
  overflow: hidden;
  z-index: 300;
  animation: up_down 2s ease-out infinite;
}


.result-box {
  top: 2rem;
  left: 0rem;
  width: 10.8rem;
  height: 11.5rem;
  background-size: cover;
  z-index: 200;
}

.light {
  top: 0;
  left: 0;
  width: 10.8rem;
  height: 11.5rem;
  background: url(../assets/img/light.png);
  background-size: cover;
  overflow: hidden;
  animation: mymove 20s infinite;
  /*Safari 和 Chrome:*/
  -webkit-animation: mymove 30s linear infinite;
}
@-webkit-keyframes mymove {
  0% {
    opacity: 0.8;
    transform: scale(1) rotate(0deg);
  }
  20% {
    opacity: 1;
    transform: scale(0.8) rotate(72deg);
  }
  40% {
    opacity: 0.6;
    transform: scale(1) rotate(144deg);
  }
  60% {
    opacity: 0.7;
    transform: scale(0.7) rotate(216deg);
  }
  80% {
    opacity: 0.6;
    transform: scale(0.9) rotate(288deg);
  }
  100% {
    opacity: 0.8;
    transform: scale(1) rotate(360deg);
  }
}

.result {
  top: 3.5rem;
  left: 1.4rem;
  width: 7.3rem;
  height: 3.96rem;
  background: url(../assets/img/result.png);
  background-size: cover;
}

.result span {
  display: inline-block;
  padding: 1rem 0.8rem;
  width: 100%;
  line-height: 0.7rem;
  font-size: 0.4rem;
  color: #4a3c43;
  text-align: left;
  box-sizing: border-box;
}

.heart-box{
  top: -0.5rem;
  left: 0.5rem;
}

.heart{
  display: inline-block;
  width: 1.61rem;
  height: 1.47rem;
  background: url(../assets/img/heart.png);
  background-size: cover;
  overflow: hidden;
}
.bounce-enter-active {
  animation: bounce-in .8s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(4);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
  70% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.word_1 {
  background: url(../assets/img/word_3.png);
}
.word_2 {
  background: url(../assets/img/word_2.png);
}
.word_3 {
  background: url(../assets/img/word_4.png);
}
.word_4 {
  background: url(../assets/img/word_1.png);
}
.word {
  bottom: 5rem;
  left: 1.4rem;
  width: 8.93rem;
  height: 2.78rem;
  background-size: contain;
  overflow: hidden;
  z-index: 200;
}
</style>
