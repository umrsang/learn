<template>
  <div class="main wh">
   <div class="invite wh">
     <span>当时的时代萨达萨达撒</span>
   </div>
  </div>
</template>

<script>
export default {
  name: 'container',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invite{
  background: url(../assets/img/1.jpg);
  background-size: 100% 100%;
}
span{
  color: #fff;
}

</style>
