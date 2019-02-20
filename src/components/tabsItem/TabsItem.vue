<!--  -->
<template>
    <div class="garen-tabsItem">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "TabsItem",
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {};
  },

  methods: {},

  components: {},

  computed: {},

  mounted() {}
};
</script>
<style scoped>
</style>