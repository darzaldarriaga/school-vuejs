import StudentApi from '../../api/api.student'

let studentApi = new StudentApi();

export const studentModule = {
  state: {
    students: []
  },
  getters: {
    getOneStudent: state => {
      return id => state.students.find(i => i.id === id)
    }
  },
  mutations: {
    setStudents(state, payload) {
      state.students = payload
    },
    removeStudent(state, payload) {
      state.students.splice(payload.index, 1)
    }
  },
  actions: {
    registerStudent: ({commit}, payload) => {
      return studentApi.registerStudent(payload).then(response => {
        console.log(response)
        return Promise.resolve(response.id)
      }).catch(error => {
        console.log(error)
        return Promise.reject(error)
      })
    },
    updateStudent: ({commit}, payload) => {
      studentApi.updateStudent(payload)
    },
    deleteStudent: ({commit}, payload) => {
      studentApi.deleteStudent(payload.id)
      commit('removeStudent', payload)
    },
    initStudents: ({commit}) => {
      studentApi.findAllStudents().then(payload => {
        commit('setStudents', payload)
      })
    },
    findOneStudent: ({commit}, payload) => {
      studentApi.findStudentById(payload).then(payload => {
        commit('setStudents', payload)
      })
    },
    getStudentReport: () => {
      return studentApi.getReport().then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    }
  }
};
