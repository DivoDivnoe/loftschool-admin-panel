<template lang="pug">
  .tabs
    ul.list
      li(v-for="tab in tabs").item
        router-link.tab(:to="tab.href", exact-active-class="active-tab") {{tab.name}}
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: 'Tab 1',
          href: '/'
        },
        {
          name: 'Tab 2',
          href: '/blog'
        },
        {
          name: 'Tab 3',
          href: '/works'
        }
      ]
    }
  }
}
</script>

<style lang="scss" src="styles/tabs.scss" scoped>

</style>
