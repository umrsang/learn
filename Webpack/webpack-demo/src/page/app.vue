<template>
  <div id="main" class="">
     <span>this is a vue component</span>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: {

  },
  mounted() {
    
  },
};
</script>

<style>
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

#app {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -7.24rem;
  margin-left: -3.75rem;
  width: 7.5rem;
  height: 14.48rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

span{
    color: yellow
}
</style>
