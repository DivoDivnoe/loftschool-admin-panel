<template lang="pug">
  #app
    admin-header
    tabs
    .content
      router-view
</template>

<script>
  import header from './components/header';
  import tabs from './components/tabs';
  import about from './components/about'

  export default {
    components: {
      adminHeader: header,
      tabs,
      about
    }
  };
</script>

<style lang="scss" src="styles/../layout/base.scss" scoped>

</style>
