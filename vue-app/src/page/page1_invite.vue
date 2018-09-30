<template>
<transition name="fade">
   <div class="invite wh pa"> 
      <div class="logo pa"></div>  
     <button class="next btn pa" @click="handleClick"></button>
   </div>
</transition>
</template>

<script>
export default {
  name: 'invite',
  props: {
    msg: String
  },
  methods: {
    handleClick() {
      this.$emit('step', 2)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invite{
  top: 0;
  left: 0;
  background: url(../assets/img/step_1_bg.jpg);
  background-size: cover;
}
span{
  color: #fff;
}

</style>
