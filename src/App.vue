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
      tabs
    }
  };
</script>

<style lang="scss" scoped>

</style>
