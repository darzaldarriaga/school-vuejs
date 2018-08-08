import TeacherApi from '../../api/api.teacher'

let teacherApi = new TeacherApi();

export const teacherModule = {
  state: {
    teachers: []
  },
  getters: {
    getTeachers: state => {
      return state.teachers
    }
  },
  mutations: {
    setTeachers(state, payload) {
      state.teachers = payload
    },
    removeTeacher(state, payload) {
      state.teachers.splice(payload.index, 1)
    },
    registerTeacher(state, payload) {
      state.teachers = payload
    }
  },
  actions: {
    registerTeacher: ({commit, state}, payload) => {
      commit('registerTeacher', payload)
      teacherApi.registerTeacher(state.teachers)
    },
    initTeachers: ({commit}) => {
      teacherApi.findAllTeachers().then(payload => {
        commit('setTeachers', payload);
      })
    },
    findOneTeacher: ({commit}, payload) => {
      teacherApi.findTeacherById(payload).then(payload => {
        commit('setTeachers', payload)
      })
    },
    updateTeacher: ({commit}, payload) => {
      teacherApi.updateTeacher(payload)
    },
    deleteTeacher: ({commit}, payload) => {
      teacherApi.deleteTeacher(payload.id)
      commit('removeTeacher', payload)
    },
    getTeacherReport: () => {
      return teacherApi.getReport().then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    }
  }
}
