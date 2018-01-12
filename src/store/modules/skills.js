const skills = {
  state: {
    data: []
  },
  getters: {
    skills(state) {
      return state.data;
    }
  },
  mutations: {
    addNewSkill(state, skill) {
      state.data.push(skill);
    },
    removeSkill(state, skillId) {
      state.data = state.data.filter(skill => skill.id !== skillId);
    }
  },
  actions: {
    loadSkills({state}) {
      return fetch('/src/skills.json')
        .then(response => response.json())
        .then(json => (state.data = json))
        .catch(error => alert(error));
    },
    uploadSkills({state}, url) {
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

export default skills;
