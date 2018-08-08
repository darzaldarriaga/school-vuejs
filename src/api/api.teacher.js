import Vue from 'vue'
export default class TeacherApi {

  registerTeacher(formData) {
    Vue.axios.post('/api/teacher/create', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  findAllTeachers() {
    return Vue.axios.get('/api/teacher/list').then(response => {
      return response.data;
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  findTeacherById(id) {
    return Vue.axios.get('/api/teacher/findOne?id=' + id).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  updateTeacher(formData) {
    Vue.axios.post('/api/teacher/update', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  deleteTeacher(id) {
    Vue.axios.delete('/api/teacher/delete?id=' + id).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  getReport() {
    return Vue.axios.get('/api/teacher/getReport', {responseType: 'blob'}).then(response => {
      return Promise.resolve(response.data)
    }).catch(error => {
      return Promise.reject(error)
    })
  }
}
