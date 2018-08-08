<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h2>{{header}}</h2>
        <div class="form-group">
          <label>First Name:</label>
          <input type="text" class="form-control" v-model="student.firstName">
        </div>
        <div class="form-group">
          <label>Middle Name:</label>
          <input type="text" class="form-control" v-model="student.middleName">
        </div>
        <div class="form-group">
          <label>Last Name:</label>
          <input type="text" class="form-control" v-model="student.lastName">
        </div>
      </div>
      <div class="table-responsive col-md-12">
        <h2 class="sub-header">{{scheduleHeader}}</h2>
        <div class="float-right" style="margin-bottom: 10px">
          <button class="btn btn-dark" v-if="!isNew" @click="addSchedules=!addSchedules, removeSchedules=false, scheduleHeader='Add New Schedules:'">Add Schedules</button>
          <button class="btn btn-dark" v-if="!isNew" @click="removeSchedules=!removeSchedules, addSchedules=false, scheduleHeader='Remove a Schedule:'">Remove Schedules</button>
        </div>
        <table class="table table-hover table-light table-bordered">
          <thead class="thead-light">
          <tr>
            <th class="col-md-4">Subject</th>
            <th class="col-md-4">Teacher</th>
            <th class="col-md-2">Days</th>
            <th class="col-md-2">Time</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="schedule in schedules" v-model="newSchedules" @click="setNewStudentSchedules(schedule.id)"
            v-bind:class="{'bg-success': newSchedules.includes(schedule.id)}" v-if="(isNew || addSchedules) && !studentSchedules.includes(schedule.id)">
            <td>{{schedule.subject.subjectCode}} - {{schedule.subject.subjectDescription}}</td>
            <td>{{ schedule.teacher.lastName }}, {{ schedule.teacher.firstName }} {{
              schedule.teacher.middleName.substr(0, 1) }}
            </td>
            <td>{{ schedule.days }}</td>
            <td>{{ schedule.time }}</td>
          </tr>
          <tr v-for="schedule in student.schedules" v-model="studentSchedules"
              v-if="!isNew && !addSchedules && !removeSchedules">
            <td>{{schedule.subject.subjectCode}} - {{schedule.subject.subjectDescription}}</td>
            <td>{{ schedule.teacher.lastName }}, {{ schedule.teacher.firstName }} {{
              schedule.teacher.middleName.substr(0, 1) }}
            </td>
            <td>{{ schedule.days }}</td>
            <td>{{ schedule.time }}</td>
          </tr>
          <tr v-for="schedule in student.schedules" v-model="schedulesToRemove" @click="setSchedsToRemove(schedule.id)"
              v-bind:class="{'bg-danger': schedulesToRemove.includes(schedule.id) && removeSchedules }" v-if="!isNew && !addSchedules && removeSchedules">
            <td>{{schedule.subject.subjectCode}} - {{schedule.subject.subjectDescription}}</td>
            <td>{{ schedule.teacher.lastName }}, {{ schedule.teacher.firstName }} {{
              schedule.teacher.middleName.substr(0, 1) }}
            </td>
            <td>{{ schedule.days }}</td>
            <td>{{ schedule.time }}</td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-dark" @click="save">Save</button>
        <button class="btn btn-dark" @click="$router.push({name: 'students'})">Back</button>
      </div>
    </div>
    <!--<p v-model="newSchedules">New Schedules: {{newSchedules}}</p>-->
    <!--<p v-model="schedulesToRemove">Schedules to Remove: {{schedulesToRemove}}</p>-->
    <!--<p v-model="studentSchedules">Current Student Schedules: {{studentSchedules}}</p>-->
    <!--<p v-model="addSchedules">Add New Schedules? {{addSchedules}}</p>-->
    <!--<p v-model="removeSchedules">Remove Schedules? {{removeSchedules}}</p>-->
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

  export default {
    name: 'appStudentForm',
    data() {
      return {
        ...mapActions([
          'findOneStudent',
          'initSchedules'
        ]),
        student: {
          lastName: '',
          firstName: '',
          middleName: '',
          schedules: []
        },
        id: this.$route.params.id,
        isNew: false,
        studentSchedules: [],
        newSchedules: [],
        schedulesToRemove: [],
        header: 'Register new Student',
        scheduleHeader: 'Select Schedules to enroll:',
        addSchedules: false,
        removeSchedules: false
      }
    },
    watch: {
      addSchedules() {
        if (!this.addSchedules && !this.removeSchedules) {
          this.scheduleHeader = 'Current Schedules:'
        }
      },
      removeSchedules() {
        if (!this.addSchedules && !this.removeSchedules) {
          this.scheduleHeader = 'Current Schedules:'
        }
      }
    },
    methods: {
      setNewStudentSchedules(id) {
        if (this.newSchedules.includes(id)) {
          let i = this.newSchedules.map(item => item).indexOf(id);
          this.newSchedules.splice(i, 1)
        } else {
          this.newSchedules.push(id)
        }
      },
      setSchedsToRemove(id) {
        if (this.schedulesToRemove.includes(id)) {
          let i = this.schedulesToRemove.map(item => item).indexOf(id);
          this.schedulesToRemove.splice(i, 1)
        } else {
          this.schedulesToRemove.push(id)
        }
      },
      save() {
        if (this.isNew) {
          this.saveNewStudent()
        } else {
          this.updateStudent()
        }
      },
      saveNewSchedule(response) {
        for (let i = 0; i < this.newSchedules.length; i++) {
          this.$store.dispatch('addStudentToSchedule', {
            id: this.newSchedules[i],
            studentId: response
          }).catch(error => {
            console.log(error)
          })
        }
      },
      removeStudentFromSchedules(response) {
        for (let i = 0; i < this.schedulesToRemove.length; i++) {
          this.$store.dispatch('removeStudentFromSchedule', {
            id: this.schedulesToRemove[i],
            studentId: response
          }).catch(error => {
            console.log(error)
          })
        }
      },
      saveNewStudent() {
        this.$store.dispatch('registerStudent', {
          firstName: this.student.firstName,
          middleName: this.student.middleName,
          lastName: this.student.lastName
        }).then(response => {
          this.saveNewSchedule(response)
        }).catch(error => {
          console.log(error)
        })
      },
      updateStudent() {
        this.$store.dispatch('updateStudent', {
          id: this.id,
          firstName: this.student.firstName,
          middleName: this.student.middleName,
          lastName: this.student.lastName
        }).then(() => {
          if(this.addSchedules) {
            this.saveNewSchedule(this.id)
          } else if (this.removeSchedules) {
            this.removeStudentFromSchedules(this.id)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    computed: {
      schedules() {
        return this.$store.state.scheduleModule.schedules
      },
      ...mapGetters([
        'getOneStudent'
      ])
    },
    created() {
      this.initSchedules();
      if (this.id === 'new') {
        this.isNew = true
      } else {
        this.student.lastName = this.getOneStudent(this.id).lastName;
        this.student.firstName = this.getOneStudent(this.id).firstName;
        this.student.middleName = this.getOneStudent(this.id).middleName;
        this.header = 'Update Student Information';
        this.scheduleHeader = 'Current Schedules:';
        this.student.schedules = this.getOneStudent(this.id).schedules
        for(let i = 0; i < this.student.schedules.length; i++) {
          this.studentSchedules.push(this.student.schedules[i].id)
        }
      }
    }
  }
</script>

<style></style>
