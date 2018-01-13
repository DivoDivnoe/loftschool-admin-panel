<template lang="pug">
  section.blog
    .page-wrapper
      h2.title Страница «Блог»
      form.form(:action="url", method="POST", @submit.prevent="upload")
        h3.form-title Добавить запись
        label.label(for="title")
          input.input(
            :class="{'input--error': validation.hasError('name')}",
            type="text",
            id="title",
            placeholder="Название",
            v-model="name"
          )
          span.visually-hidden Название
          div.error(:class="{'error--active': validation.hasError('name')}") {{validation.firstError("name")}}
        label.label(for="date")
          input.input(
            :class="{'input--error': validation.hasError('date')}",
            type="text", id="date",
            placeholder="Дата",
            v-model="date"
          )
          span.visually-hidden Дата
          div.error(:class="{'error--active': validation.hasError('date')}") {{validation.firstError("date")}}
        label.label(for="message")
          textarea.message(
            :class="{'input--error': validation.hasError('text')}",
            type="text",
            id="message",
            placeholder="Содержание",
            v-model="text"
          )
          span.visually-hidden Дата
          div.error(:class="{'error--active': validation.hasError('text')}") {{validation.firstError("text")}}
        button.button(type="submit") Добавить
    .wrapper(:class="{'wrapper--active': submitted}")
      .popup
        p.message Сообщение отправлено
        button.button(@click="closePopup") Закрыть
</template>

<script>
  import {Validator} from 'simple-vue-validator';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      'name'(value) {
        return Validator.value(value).required('Поле должно быть заполнено');
      },
      'date'(value) {
        return Validator.value(value).required('Поле должно быть заполнено');
      },
      'text'(value) {
        return Validator.value(value).required('Поле должно быть заполнено');
      }
    },
    data() {
      return {
        url: '#',
        submitted: false,
        name: '',
        date: '',
        text: ''
      }
    },
    methods: {
      closePopup() {
        this.submitted = false;
      },
      upload() {
        this.$validate().then(success => {
          if (!success) return false;


          this.uploadData();
        });
      },
      uploadData() {
        const settings = {
          body: JSON.stringify({
            name: this.name,
            data: this.date,
            text: this.text
          }),
          headers: {
            'Content-type': 'application/json'
          },
          method: 'POST'
        };
        return fetch(this.url, settings).catch(error => console.error(error));
      }
    }
  };
</script>

<style lang="scss" src="styles/blog.scss" scoped>

</style>
