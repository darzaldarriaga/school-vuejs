import Vue from 'vue'

export default class StudentApi {

  registerStudent(formData) {
    return Vue.axios.post('/api/student/create', formData).then(response => {
      console.log(response)
      return Promise.resolve(response.data)
    }).catch(error => {
      console.log(error)
      return Promise.reject('Null')
    })
  }

  updateStudent(formData) {
    Vue.axios.post('/api/student/update', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  deleteStudent(id) {
    Vue.axios.delete('/api/student/delete', {
      params: {
        id: id
      }
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  findAllStudents() {
    return Vue.axios.get('/api/student/list').then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  findStudentById(id) {
    return Vue.axios.get('/api/student/findOne', {
      params: {
        id: id
      }
    }).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  getReport() {
    return Vue.axios.get('/api/student/getReport', {responseType: 'blob'}).then(response => {
      return Promise.resolve(response.data)
    }).catch(error => {
      return Promise.reject(error)
    })
  }
}
