import Vue from 'vue'
export default class SubjectApi {

  createSubject(formData) {
    Vue.axios.post('/api/subject/create', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  updateSubject(formData) {
    Vue.axios.post('/api/subject/update', formData).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  deleteSubject(id) {
    Vue.axios.delete('/api/subject/delete', {
      params: {
        id:id
      }
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  findAllSubjects() {
    return Vue.axios.get('/api/subject/list').then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  findSubjectById(id) {
    return Vue.axios.get('/api/subject/findOne?id=' + id ).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject('Error!')
    })
  }

  getReport() {
    return Vue.axios.get('/api/subject/getReport', {responseType: 'blob'}).then(response => {
      return Promise.resolve(response.data)
    }).catch(error => {
      return Promise.reject(error)
    })
  }
}
