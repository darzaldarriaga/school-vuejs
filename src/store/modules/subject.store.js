import SubjectApi from '../../api/api.subject';

let subjectApi = new SubjectApi();

export const subjectModule = {
  state: {
    subjects: []
  },
  getters: {
    getSubjects: state => {
      return state.subjects
    }
  },
  mutations: {
    setSubjects(state, payload) {
      state.subjects = payload;
    },
    removeSubject(state, payload) {
      state.subjects.splice(payload.index, 1)
    },
    createTeacher(state, payload) {
      state.subjects = payload;
    }
  },
  actions: {
    createSubject: ({commit, state}, payload) => {
      commit('createTeacher', payload)
      subjectApi.createSubject(state.subjects)
    },
    updateSubject: ({commit}, payload) => {
      subjectApi.updateSubject(payload)
    },
    deleteSubject: ({commit}, payload) => {
      subjectApi.deleteSubject(payload.id)
      commit('removeSubject', payload)
    },
    initSubjects: ({commit}) => {
      subjectApi.findAllSubjects().then(payload => {
        commit('setSubjects', payload)
      })
    },
    findOneSubject: ({commit}, payload) => {
      subjectApi.findSubjectById(payload).then(payload => {
        commit('setSubjects', payload)
      })
    },
    getSubjectReport: () => {
      return subjectApi.getReport().then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    }
  }
};
