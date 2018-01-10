<template lang="pug">
  div
    h3.title {{skillType}}
    table.table
      skill-item(
        v-for="(skill, index) in skills"
        :key="skill.id",
        :skill="skill",
        @removeSkill="removeSkill",
        v-if="checkSkillType(skillType) === skill.type")
    .addButton
      button(type="button", @click="addSkill") Добавить новый
      input(:class="{error: validation.hasError('newSkill')}", type="text", @keydown.enter="addSkill", v-model="newSkill")
      div {{validation.firstError('newSkill')}}
</template>

<script>
  import skillItem from './skillItem';
  import {mapMutations} from 'vuex';
  import {Validator} from 'simple-vue-validator';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      newSkill(value) {
        return Validator.value(value).required('Поле должно быть заполнено!');
      }
    },
    props: {
      skillType: String,
      skills: Array
    },
    data() {
      return {
        newSkill: ''
      }
    },
    methods: {
      ...mapMutations(['addNewSkill', 'removeSkill']),
      checkSkillType(skillType) {
        const skillsTypes = {
          frontend: 1,
          backend: 2,
          workflow: 3
        };

        return skillsTypes[skillType];
      },
      addSkill() {
        this.$validate().then(success => {
          if (!success) return false;

          this.addNewSkill({
            id: Math.round(Math.random() * 1000000),
            name: this.newSkill,
            perc: 0,
            type: this.checkSkillType(this.skillType)
          });

          this.newSkill = '';
          this.validation.reset();
        })
      }
    },
    components: {
      skillItem
    }
  };
</script>

<style lang="scss" src="styles/skillsList.scss" scoped>

</style>
