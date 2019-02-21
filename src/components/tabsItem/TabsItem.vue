<!--  -->
<template>
    <div class="garen-tabsItem" v-show="itemVisible">
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
    return {
        itemVisible:false
    };
  },

  methods: {},

  components: {},

  computed: {},

  mounted() {}
};
</script>
<style scoped>
</style>