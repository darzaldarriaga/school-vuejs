<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h2>{{header}}</h2>
        <div class="form-group">
          <label>Subject Code:</label>
          <input type="text" class="form-control" v-model="subject.subjectCode">
        </div>
        <div class="form-group">
          <label>Subject Description:</label>
          <input type="text" class="form-control" v-model="subject.subjectDescription">
        </div>
        <button class="btn btn-dark" @click="save">Save</button>
        <button class="btn btn-dark" @click="$router.push({name: 'subjects'})">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'appSubjectForm',
    data() {
      return {
        header: 'Create new subject',
        ...mapActions([
          'findOneSubject'
        ]),
        id: this.$route.params.id,
        isNew: false,
      }
    },
    methods: {
      save() {
        if (this.isNew) {
          this.$store.dispatch('createSubject', {
            subjectCode: this.subject.subjectCode,
            subjectDescription: this.subject.subjectDescription
          }).catch(error => {
            console.log(error)
          });
        } else {
          this.$store.dispatch('updateSubject', this.subject).catch(error => {
            console.log(error)
          });
          alert("Subject information updated!")
        }
      }
    },
    computed: {
      subject() {
        return this.$store.state.subjectModule.subjects
      }
    },
    created() {
      if(this.id === 'new') {
        this.isNew = true
      } else {
        this.findOneSubject(this.id)
        this.header = 'Update subject information'
      }
    }
  }
</script>

<style>

</style>
