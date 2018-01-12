<template lang="pug">
  section.blog
    .page-wrapper
      h2.title Страница «Блог»
      form.form(:action="url", method="POST", @submit.prevent="upload")
        h3.form-title Добавить запись
        label.label(for="title")
          input.input(
            :class="{'input--error': validation.hasError('article.name')}",
            type="text",
            id="title",
            placeholder="Название",
            v-model="article.name"
          )
          span.visually-hidden Название
          div.error(:class="{'error--active': validation.hasError('article.name')}") {{validation.firstError("article.name")}}
        label.label(for="date")
          input.input(
            :class="{'input--error': validation.hasError('article.date')}",
            type="text", id="date",
            placeholder="Дата",
            v-model="article.date"
          )
          span.visually-hidden Дата
          div.error(:class="{'error--active': validation.hasError('article.date')}") {{validation.firstError("article.date")}}
        label.label(for="message")
          textarea.message(
            :class="{'input--error': validation.hasError('article.text')}",
            type="text",
            id="message",
            placeholder="Содержание",
            v-model="article.text"
          )
          span.visually-hidden Дата
          div.error(:class="{'error--active': validation.hasError('article.text')}") {{validation.firstError("article.text")}}
        button.button(type="submit") Добавить
    .wrapper(:class="{'wrapper--active': submitted}")
      .popup
        p.message Сообщение отправлено
        button.button(@click="closePopup") Закрыть
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import {Validator} from 'simple-vue-validator';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      'article.name'(value) {
        return Validator.value(value).required('Поле должно быть заполнено');
      },
      'article.date'(value) {
        return Validator.value(value).required('Поле должно быть заполнено');
      },
      'article.text'(value) {
        return Validator.value(value).required('Поле должно быть заполнено');
      }
    },
    data() {
      return {
        url: '#',
        submitted: false
      }
    },
    computed: {
      ...mapGetters(['article'])
    },
    methods: {
      ...mapActions(['uploadData']),
      ...mapMutations(['addNewArticle']),
      closePopup() {
        this.submitted = false;
      },
      upload() {
        this.$validate().then(success => {
          if (!success) return false;

          this.addNewArticle(this.article);
          this.uploadData(this.url);
        });
      }
    }
  };
</script>

<style lang="scss" src="styles/blog.scss" scoped>

</style>
