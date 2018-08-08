<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h2>{{ header }}</h2>
        <div class="form-group">
          <label>First Name:</label>
          <input type="text" class="form-control" v-model="teacher.firstName">
        </div>
        <div class="form-group">
          <label>Middle Name:</label>
          <input type="text" class="form-control" :placeholder="middleNamePlaceHolder" v-model="teacher.middleName">
        </div>
        <div class="form-group">
          <label>Last Name:</label>
          <input type="text" class="form-control" v-model="teacher.lastName">
        </div>
        <button class="btn btn-dark" @click="save">Save</button>
        <button class="btn btn-dark" @click="$router.push({name: 'teachers'})">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'AppTeacherForm',
    data() {
      return {
        ...mapActions([
          'findOneTeacher'
        ]),
        id: this.$route.params.id,
        isNew: false,
        header: 'Register New Teacher',
        middleNamePlaceHolder: 'Leave blank if not applicable'
      }
    },
    methods: {
      save() {
        if (this.id === 'new') {
          if(this.teacher.middleName === undefined) {
            this.teacher.middleName = ' '
          }

          this.$store.dispatch('registerTeacher', {
            lastName: this.teacher.lastName,
            firstName: this.teacher.firstName,
            middleName: this.teacher.middleName
          }).catch(error => {
            console.log(error)
          });
        } else {
          this.$store.dispatch('updateTeacher', this.teacher).catch(error => {
            console.log(error)
          });
          alert("Teacher information updated!")
        }
      }
    },
    computed: {
      teacher() {
        return this.$store.state.teacherModule.teachers
      }
    },
    created() {
      if (this.id === 'new') {
        this.isNew = true;
      } else {
        this.findOneTeacher(this.id);
        this.header = 'Update Teacher information'
      }
    }
  }
</script>

<style></style>
