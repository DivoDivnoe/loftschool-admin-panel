<template lang="pug">
  section.about
    .page-wrapper
      h2.title Страница «Обо мне
      form.form(:action="url", method="POST", @submit.prevent="uploadData")
        .form-content
          skills-list(
            v-for="(skillType, index) in skillsTypes",
            :skillType="skillType",
            :key="index",
            :skills="skills",
            :validate="validate",
            @validationFail="validationFail",
            @validationSuccess="validationSuccess"
          )
        button.button.button--form(type="submit") Сохранить
    .wrapper(:class="{'wrapper--active': submitted}")
      .popup
        p.message Сообщение отправлено
        button.button.button--popup(@click="closePopup") Закрыть

</template>

<script>
  import skillsList from './skillsList';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        url: '#',
        skillsTypes: ['frontend', 'backend', 'workflow'],
        submitted: false,
        validate: false,
        validInputs: 0
      }
    },
    computed: {
      ...mapGetters(['skills'])
    },
    methods: {
      ...mapActions(['loadSkills', 'uploadSkills']),
      uploadData(evt) {
        this.validate = true;
        this.validInputs = 0;
      },
      closePopup() {
        this.submitted = false;
      },
      openPopup() {
        this.submitted = true;
      },
      validationSuccess() {
        this.validInputs++;

        if (this.validInputs !== this.skills.length) return false;

        this.uploadSkills(this.url)
          .then(() => {
            this.openPopup;
            this.validate = false;
          });
      },
      validationFail() {
        this.validate = false;
      }
    },
    created() {
      this.loadSkills();
    },
    components: {
      skillsList
    }
  };
</script>

<style lang="scss" src="styles/about.scss" scoped>

</style>
