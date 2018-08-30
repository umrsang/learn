<template>
  <div class="main wh pr">
    <page-invite v-if="step==1" @step="stepChange"></page-invite>
    <page-role  v-if="step==2"></page-role>
  </div>
</template>

<script>
import pageInvite from "./page1_invite.vue";
import pageRole from "./page2_role.vue";


export default {
  name: 'container',
  props: {
    msg: String
  },
  data(){
    return {
      step: 1,
    }
  },
  methods: {
    stepChange(index) {
      this.step = index;
    }
  },
  components: {
    pageInvite,
    pageRole
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invite{
  background: url(../assets/img/1.jpg);
  background-size: cover;
}
.go{
  bottom: 0.8rem;
  left: 3rem;
  width: 4.8rem;
  height: 2.77rem;
  background: url(../assets/img/go.png);
  background-size: cover;
}
span{
  color: #fff;
}

</style>
