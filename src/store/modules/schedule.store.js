import ScheduleApi from '../../api/api.schedule'

let scheduleApi = new ScheduleApi();

export const scheduleModule = {
  state: {
    schedules: []
  },
  getters: {
    getOneSchedule: state => {
      return id => state.schedules.find(i => i.id === id)
    },
    getSchedules: state => {
      return state.schedules
    }
  },
  mutations: {
    setSchedules(state, payload) {
      state.schedules = payload
    },
    removeSchedule(state, payload) {
      state.schedules.splice(payload.index, 1)
    },
    createSchedule(state, payload) {
      state.schedules = payload
    },
    setOneSchedule(state, payload) {
      state.schedule = payload
    }
  },
  actions: {
    createSchedule: ({commit}, payload) => {
      //commit('createSchedule', payload)
      scheduleApi.createSchedule(payload)
    },
    updateSchedule: ({commit}, payload) => {
      console.log(payload);
      scheduleApi.updateSchedule(payload)
    },
    deleteSchedule: ({commit}, payload) => {
      scheduleApi.deleteSchedule(payload.id)
      commit('removeSchedule', payload)
    },
    initSchedules: ({commit}) => {
      scheduleApi.findAllSchedules().then(payload => {
        commit('setSchedules', payload)
      })
    },
    findOneSchedule: ({commit}, payload) => {
      scheduleApi.findScheduleById(payload).then(payload => {
        commit('setOneSchedule', payload)
      })
    },
    addStudentToSchedule: ({commit}, payload) => {
      scheduleApi.addStudent(payload)
    },
    removeStudentFromSchedule: ({commit}, payload) => {
      scheduleApi.removeStudent(payload)
    },
    getScheduleReport: () => {
      return scheduleApi.getReport().then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    }
  }
};
