<template lang="pug">
  section.works
    .page-wrapper
      h2.title Страница «Мои работы»
      form.form(:action="url", method="POST", enctype="multipart/form-data", @submit.prevent="upload")
        h3.form-title Добавить работу
        label.label(for="title")
          input.input(
            :class="{'input--error': validation.hasError('name')}",
            type="text",
            id="title",
            placeholder="Название проекта",
            v-model="name"
          )
          span.visually-hidden Название проекта
          div.error(:class="{'error--active': validation.hasError('name')}") {{validation.firstError("name")}}
        label.label(for="tehnologies")
          input.input(
            :class="{'input--error': validation.hasError('tehnologies')}",
            type="text", id="tehnologies",
            placeholder="Технологии",
            v-model="tehnologies"
          )
          span.visually-hidden Технологии
          div.error(:class="{'error--active': validation.hasError('tehnologies')}") {{validation.firstError("tehnologies")}}
        label.label.label--file(for="file")
          input.input-file(
            :class="{'input--error': validation.hasError('img')}",
            type="file", id="file",  @change="sync"
          )
          span.load Загрузить картинку
          span.visually-hidden Технологии
          div.error(:class="{'error--active': validation.hasError('image')}") {{validation.firstError("image")}}
        button.button(type="submit") Добавить
    .wrapper(:class="{'wrapper--active': submitted}")
      .popup
        p.message Сообщение отправлено
        button.button(@click="closePopup") Закрыть
</template>

<script>
  import {Validator} from 'simple-vue-validator';
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      'name'(value) {
        return Validator.value(value).required('Поле должно быть заполнено!');
      },
      'tehnologies'(value) {
        return Validator.value(value).required('Поле должно быть заполнено!');
      },
      'image'(value) {
        return Validator.value(value).required('Поле должно быть заполнено!');
      }
    },
    data() {
      return {
        url: '/api/works',
        submitted: false,
        name: '',
        tehnologies: '',
        image: ''
      }
    },
    methods: {
      closePopup() {
        this.submitted = false;
      },
      openPopup() {
        this.submitted = true;
      },
      upload() {
        this.$validate().then(success => {
          if (!success) return false;

          this.uploadData(this.url);
        });
      },
      sync(evt) {
        this.image = evt.target.files[0];
      },
      uploadData(url) {
        const form = new FormData();

        form.append('name', this.name);
        form.append('tehnologies', this.tehnologies);
        form.append('image', this.image);

        const settings = {
          body: form,
          headers: {
            'Content-type': 'multipart/form-data'
          },
          method: 'POST'
        };

        return fetch(url, settings).catch(error => alert(error));
      }
    }
  };
</script>

<style lang="scss" src="styles/works.scss" scoped>

</style>
