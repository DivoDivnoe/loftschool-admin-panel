import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import skills from './modules/skills';
import blog from './modules/blog';

const store = new Vuex.Store({
  modules: {skills, blog}
});

export default store;
