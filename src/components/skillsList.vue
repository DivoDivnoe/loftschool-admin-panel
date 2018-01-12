<template lang="pug">
  div.list
    h3.title {{skillType}}
    table.table
      skill-item(
        v-for="(skill, index) in skills"
        :key="skill.id",
        :skill="skill",
        :validate="validate",
        @validationSuccess="validationSuccess",
        @validationFail="validationFail",
        v-if="checkSkillType(skillType) === skill.type")
</template>

<script>
  import skillItem from './skillItem';

  export default {
    props: {
      skillType: String,
      skills: Array,
      validate: Boolean
    },
    methods: {
      checkSkillType(skillType) {
        const skillsTypes = {
          frontend: 1,
          backend: 2,
          workflow: 3
        };

        return skillsTypes[skillType];
      },
      validationSuccess() {
        this.$emit('validationSuccess');
      },
      validationFail() {
        this.$emit('validationFail');
      }
    },
    components: {
      skillItem
    }
  };
</script>

<style lang="scss" src="styles/skillsList.scss" scoped>

</style>
