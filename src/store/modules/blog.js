const blog = {
  state: {
    data: {
      name: '',
      date: '',
      text: ''
    }
  },
  getters: {
    article(state) {
      return state.data;
    }
  },
  mutations: {
    addNewArticle(state, article) {
      state.data = article;
    }
  },
  actions: {
    uploadData({state}, url) {
      const settings = {
        body: JSON.stringify(state.data),
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST'
      };
      return fetch(url, settings).catch(error => console.error(error));
    }
  }
};

export default blog;
