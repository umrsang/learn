<template>
  <div class="main wh pr">
    <page-invite v-if="step==1" @step="stepChange"></page-invite>
    <page-role  v-if="step==2" @step="stepChange" @setRole="handleSetRole"></page-role>
    <page-tips  v-if="step==3" @step="stepChange" :roleIndex="roleIndex"></page-tips>
    <page-clothing  v-if="step==4" @step="stepChange"></page-clothing>
    <page-result v-if="step==5"  :roleIndex="roleIndex"></page-result>
  </div>
</template>

<script>
import pageInvite from "./page1_invite.vue";
import pageRole from "./page2_role.vue";
import pageTips from "./page3_tips.vue";
import pageClothing from "./page4_clothing.vue";
import pageResult from "./page5_result.vue";

export default {
  name: "container",
  props: {
    msg: String
  },
  data() {
    return {
      step: 1,
      roleIndex: 2
    };
  },
  methods: {
    stepChange(index) {
      this.step = index;
    },
    handleSetRole(role) {
      this.roleIndex = role.getAttribute("data-index");
    }
  },
  components: {
    pageInvite,
    pageRole,
    pageTips,
    pageClothing,
    pageResult
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  color: #fff;
}
</style>
<style>

.logo {
  top: 0.3rem;
  left: 0.7rem;
  width: 3.86rem;
  height: 2.15rem;
  background: url(../assets/img/logo.png);
  background-size: cover;
  z-index: 1000;
}
.next {
  margin-left: -2.4rem;
  bottom: 0.8rem;
  left: 50%;
  width: 4.8rem;
  height: 2.77rem;
  background: url(../assets/img/next.png);
  background-size: cover;
  z-index: 1000;
  animation: up_down 2s ease-out infinite;
}
.role {
  width: 10.77rem;
  height: 15.48rem;
  background-size: cover;
  /* transition: opacity  0.2s, filter 0.8s; */
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
</style>