import Vue from 'vue'

export default class ScheduleApi {

  createSchedule(formData) {
    Vue.axios.post('/api/schedule/create', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  updateSchedule(formData) {
    Vue.axios.post('/api/schedule/update', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  deleteSchedule(id) {
    Vue.axios.delete('/api/schedule/delete', {
      params: {
        id: id
      }
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  findAllSchedules() {
    return Vue.axios.get('/api/schedule/list').then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  findScheduleById(id) {
    return Vue.axios.get('/api/schedule/findOne?id=' + id).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  addStudent(ids) {
    return Vue.axios.post('/api/schedule/addStudent', ids).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  removeStudent(ids) {
    Vue.axios.post('/api/schedule/removeStudent', ids).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  getReport() {
    return Vue.axios.get('/api/schedule/getReport', {responseType: 'blob'}).then(response => {
      return Promise.resolve(response.data)
    }).catch(error => {
      return Promise.reject(error)
    })
  }
}
