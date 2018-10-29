<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue.js!"
    };
  },
  mounted(){
    console.log("this is a vue message" + this.message)
  }
};
</script>

<style>

span, p{
  color: yellow;
}
</style>
 