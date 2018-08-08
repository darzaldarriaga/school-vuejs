<template>
  <div class="container-fluid">
    <div class="row" style="margin-bottom: 15px">
      <a :href="link" download="student-report.pdf">
        <button class="btn btn-dark">Download Report</button>
      </a>
    </div>
    <div class="row justify-content-md-center">
      <table class="table table-hover table-bordered">
        <thead>
        <tr>
          <td>
            <b>First Name</b>
          </td>
          <td>
            <b>Middle Name</b>
          </td>
          <td>
            <b>Last Name</b>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(student, index) in students">
          <td>{{student.firstName}}</td>
          <td>{{student.middleName}}</td>
          <td>{{student.lastName}}</td>
          <td>
          <button class="btn btn-success" @click="$router.push({name: 'student', params: {id: student.id}})">Update</button>
          <button class="btn btn-danger" @click="deleteStudent({id: student.id, index})">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="btn btn-dark" @click="$router.push({name: 'student', params: { id: 'new' }})">Register new Student</button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'AppStudents',
    data() {
      return {
        ...mapActions([
          'initStudents',
          'getStudentReport'
        ]),
        link: ''
      }
    },
    methods: {
      deleteStudent(id) {
        if(confirm("Do you want to delete the student record?")) {
          this.$store.dispatch('deleteStudent', id).catch(error => {
            console.log(error)
          })
        }
      },
      setLink() {
        this.getStudentReport().then(response => {
          let pdfFile = new Blob([response], {type: "application/pdf"});
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(pdfFile);
          this.link = link
        }).catch(error => {
          console.log(error)
        })
      }
    },
    computed: {
      students() {
        return this.$store.state.studentModule.students
      }
    },
    created() {
      this.initStudents()
      this.setLink()
    }
  }
</script>

<style></style>
