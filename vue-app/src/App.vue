<template>
  <div id="app" class="wh">
    <container></container> 
  </div>
</template>

<script>
import "./assets/css/grobal.css";
import container from "./page/container.vue";

export default {
  name: "app",
  components: {
    container
  }
};
</script>

<style>
html,
body {
  width: 10.8rem;
  height: 19.8rem;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
