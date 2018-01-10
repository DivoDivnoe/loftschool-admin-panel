<template lang="pug">
  .about
    h2.title Страница «Обо мне»
    form(action="#", method="POST", @submit="uploadData")
      skills-list(
        v-for="(skillType, index) in skillsTypes",
        :skillType="skillType",
        :key="index",
        :skills="skills"
      )
      button(type="submit").button Сохранить
    .wrapper(:class="{'wrapper--active': popup}")
      .popup
        p.message Сообщение отправлено
        button.button(@click="closePopup") Закрыть

</template>

<script>
  import skillsList from './skillsList';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        skillsTypes: ['frontend', 'backend', 'workflow'],
        popup: false
      }
    },
    computed: {
      ...mapGetters(['skills'])
    },
    methods: {
      ...mapActions(['loadSkills', 'uploadSkills']),
      uploadData(evt) {
        evt.preventDefault();

        this.uploadSkills()
          .then(() => showPopup)
      },
      closePopup() {
        this.popup = false;
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
