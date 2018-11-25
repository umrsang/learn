<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">"Just start  <b-icon
      icon="rocket"
      size="is-large" />"</h2>
    <h3 class="subtitle is-6 has-text-grey">Author23333445: <a href="https://github.com/anteriovieira">Antério Vieira</a></h3>
  </section>
</template>
<script>
import BLogo from "@/components/Logo";

export default {
  name: "HomePage",
  layout: 'blog',
  components: { BLogo },
  data() {
    return {
      title: "demo",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description 23333"
        }
      ]
    };
  }
};
</script>