<template>
  <div class="container-fluid">
    <div class="row" style="margin-bottom: 15px">
      <a :href="link" download="subject-report.pdf">
        <button class="btn btn-dark">Download Report</button>
      </a>
    </div>
    <div class="row justify-content-md-center">
      <table class="table table-hover table-bordered">
        <thead>
        <tr>
          <td>
            <b>Code</b>
          </td>
          <td>
            <b>Description</b>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(subject, index) in subjects">
          <td>{{ subject.subjectCode }}</td>
          <td>{{ subject.subjectDescription }}</td>
          <td>
          <button class="btn btn-success" @click="$router.push({ name: 'subject', params: { id: subject.id } })">
            Update
          </button>
          <button class="btn btn-danger" @click="deleteSubject({ id:subject.id, index })">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="btn btn-dark" @click="$router.push({ name: 'subject', params: { id: 'new' } })">Create new Subject</button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'AppSubjects',
    data() {
      return {
        ...mapActions([
          'initSubjects',
          'getSubjectReport'
        ]),
        link: ''
      }
    },
    methods: {
      deleteSubject(id) {
        if (confirm("Do you want to delete the subject?")) {
          this.$store.dispatch('deleteSubject', id).catch(error => {
            console.log(error)
          })
        }
      },
      setLink() {
        this.getSubjectReport().then(response => {
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
      this.initSubjects()
      this.setLink()
    },
    computed: {
      subjects() {
        return this.$store.state.subjectModule.subjects
      }
    }
  }
</script>

<style>

</style>
