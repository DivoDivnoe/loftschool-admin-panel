<template lang="pug">
  tr.row
    td.name {{skill.name}}
    td.value
      label.label(for="skill.name")
        input.input(
          :class="{'input--error': validation.hasError('skill.perc')}",
          id="skill.name",
          type="text",
          v-model='skill.perc'
        )
        span.visually-hidden {{skill.name}}
        div.error(:class="{'error--active': validation.hasError('skill.perc')}") {{validation.firstError("skill.perc")}}
    td.perc %
</template>

<script>
  import {Validator} from 'simple-vue-validator';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      'skill.perc'(value) {
        return Validator.value(value).required('Поле должно быть заполнено!').integer('Вы ввели не число');
      }
    },
    props: {
      skill: Object,
      validate: Boolean
    },
    computed: {
      resetValidate() {
        this.validate = false;
      }
    },
    watch: {
      validate(newValue) {
        if (!newValue) return false;

        this.$validate()
          .then(success => {
            if (!success) {
              this.$emit('validationFail');
              return false;
            };

            this.$emit('validationSuccess');
            this.validation.reset();
          });
      }
    },
  }
</script>

<style lang="scss" src="styles/skillItem.scss" scoped>

</style>
