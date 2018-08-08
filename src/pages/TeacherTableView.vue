<template>
  <div class="container-fluid">
    <div class="row" style="margin-bottom: 15px">
      <a :href="link" download="teacher-report.pdf">
        <button class="btn btn-dark">Download Report</button>
      </a>
    </div>
    <div class="row justify-content-md-center">
      <table class="table table-hover table-bordered">
        <thead>
        <tr>
          <td>
            Id
          </td>
          <td>
            First Name
          </td>
          <td>
            Middle Name
          </td>
          <td>
            Last Name
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(teacher, index) in teacherList">
          <td>{{ teacher.id }}</td>
          <td>{{ teacher.firstName }}</td>
          <td>{{ teacher.middleName }}</td>
          <td>{{ teacher.lastName }}</td>
          <td>
          <button class="btn btn-success" @click="$router.push({ name: 'teacher', params: { id: teacher.id } })">
            Update
          </button>
          <button class="btn btn-danger" @click="deleteTeacher({ id: teacher.id, index})">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="btn btn-dark" @click="$router.push({ name: 'teacher', params: { id: 'new' } })">Register new
        Teacher
      </button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'AppTeachers',
    data() {
      return {
        ...mapActions([
          'initTeachers',
          'getTeacherReport'
        ]),
        link: ''
      }
    },
    methods: {
      deleteTeacher(id) {
        if (confirm('Do you want to delete the teacher?')) {
          this.$store.dispatch('deleteTeacher', id).catch(error => {
            console.log(error)
          })
        }
      },
      setLink() {
        this.getTeacherReport().then(response => {
          const url = window.URL.createObjectURL(new Blob([response]), {type: "application/pdf"});
          const link = document.createElement('a');
          link.href = url;
          this.link = link
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created() {
      this.initTeachers()
      this.setLink()
    },
    computed: {
      teacherList() {
        return this.$store.state.teacherModule.teachers
      }
    }
  }
</script>

<style></style>
