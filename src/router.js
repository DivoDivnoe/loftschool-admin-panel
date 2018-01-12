import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: require('./components/about.vue').default
  },
  {
    path: '/blog',
    component: require('./components/blog.vue').default
  },
  {
    path: '/works',
    component: require('./components/works.vue').default
  }
];

export default new VueRouter({
  routes,
  mode: 'history'
});
