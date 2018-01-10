<template lang="pug">
  tr
    td {{skill.name}}
    td
      input(
        type="text",
        v-model="skill.perc"
      )
      div {{validation.firstError('newSkill')}}
    td %
    td
      button(type="button", @click="remove").remove Удалить

</template>

<script>
  import {Validator} from 'simple-vue-validator';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      skill.perc(value) {
        return Validator.value(value).required('Поле должно быть заполнено!');
      }
    },
    props: {
      skill: Object
    },
    methods: {
      remove() {
        this.$emit('removeSkill', this.skill.id);
      }
    }
  }
</script>

<style lang="scss" src="styles/skillItem.scss" scoped>

</style>
