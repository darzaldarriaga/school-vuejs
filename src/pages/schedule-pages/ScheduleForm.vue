<template>
  <div>
    <h2>{{header}}</h2>
    <hr>
    <div class="row">
      <div class="table-responsive col-md-6">
        <h2 class="sub-header">Subjects</h2>
        <table class="table table-hover table-light table-bordered">
          <thead class="thead-light">
          <tr>
            <th class="col-md-1">Subject Code</th>
            <th class="col-md-4">Subject Description</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="subject in getSubjects" @click="setSubjectId(subject.id)"
              v-bind:class="{'table-info': (subject.id === subjectId)}" v-if="isNew || changeSubject">
            <td>{{ subject.subjectCode }}</td>
            <td>{{ subject.subjectDescription }}</td>
          </tr>
          <tr v-if="!isNew && !changeSubject">
            <td>{{ getOneSchedule(id).subject.subjectCode }}</td>
            <td>{{ getOneSchedule(id).subject.subjectDescription }}</td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-dark" v-if="!isNew" @click="changeSubject = !changeSubject">Change Subject</button>
      </div>
      <div class="table-responsive col-md-6">
        <h2 class="sub-header">Teachers</h2>
        <table class="table table-hover table-light table-bordered">
          <thead class="thead-light">
          <tr>
            <th class="col-md-2">First Name</th>
            <th class="col-md-1">MI</th>
            <th class="col-md-2">Last Name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="teacher in getTeachers" @click="setTeacherId(teacher.id)"
              v-bind:class="{'table-info': (teacher.id === teacherId)}" v-if="isNew || changeTeacher">
            <td>{{ teacher.firstName }}</td>
            <td>{{ teacher.middleName }}</td>
            <td>{{ teacher.lastName }}</td>
          </tr>
          <tr v-if="!isNew && !changeTeacher">
            <td>{{ getOneSchedule(id).teacher.firstName }}</td>
            <td>{{ getOneSchedule(id).teacher.middleName }}</td>
            <td>{{ getOneSchedule(id).teacher.lastName }}</td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-dark" v-if="!isNew" @click="changeTeacher = !changeTeacher">Change Teacher</button>
      </div>
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <label class="marginLabel">Days</label>
        <div>
          <template v-for="(day) in days">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :id="day" :value="getDayInitial(day)"
                     v-model="scheduleDaysArray" @change="setScheduleDays">
              <label class="form-check-label">{{ day }}</label>
            </div>
          </template>
        </div>
        <label class="marginLabel">Time</label>
        <div class="form-row">
          <div class="form-group col-md-3">
            <select class="form-control" v-model="scheduleTimeArr[0]" @change="setScheduleTime">
              <option v-for="time in times">{{ time }}</option>
            </select>
          </div>
          <h3>-</h3>
          <div class="form-group col-md-3">
            <select class="form-control" v-model="scheduleTimeArr[1]" @change="setScheduleTime">
              <option v-for="time in times" v-if="scheduleTimeArr[0] < time">{{ time }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-dark" @click="save">Save</button>
    <button class="btn btn-dark" @click="$router.push({name: 'schedules'})">Back</button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        ...mapActions([
          'initTeachers',
          'initSubjects',
          'findOneSchedule'
        ]),
        times: [
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00'
        ],
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        id: this.$route.params.id,
        isNew: false,
        changeSubject: false,
        changeTeacher: false,
        teacherId: '',
        subjectId: '',
        scheduleDays: '',
        scheduleTime: '',
        scheduleDaysArray: [],
        scheduleTimeArr: [],
        header: 'Create new Schedule'
      }
    },
    created() {
      if (this.id === 'new') {
        this.isNew = true;
        this.initTeachers();
        this.initSubjects();
      } else {
        this.header = 'Update Schedule';
        this.scheduleDays = this.getOneSchedule(this.id).days;
        this.scheduleTime = this.getOneSchedule(this.id).time;
        this.scheduleTimeArr = this.getOneSchedule(this.id).time.split(' - ');
        this.scheduleDaysArray = this.getOneSchedule(this.id).days.split('-');
        this.teacherId = this.getOneSchedule(this.id).teacher.id;
        this.subjectId = this.getOneSchedule(this.id).subject.id;
      }
    },
    computed: {
      ...mapGetters([
        'getOneSchedule',
        'getSubjects',
        'getTeachers'
      ])
    },
    methods: {
      save() {
        if (this.isNew) {
          this.$store.dispatch('createSchedule', {
            subjectId: this.subjectId,
            teacherId: this.teacherId,
            days: this.scheduleDays,
            time: this.scheduleTime
          }).catch(error => {
            console.log(error)
          }).then(
            alert("Schedule successfully created!")
          )
        } else {
          this.$store.dispatch('updateSchedule', {
            id: this.id,
            subjectId: this.subjectId,
            teacherId: this.teacherId,
            days: this.scheduleDays,
            time: this.scheduleTime
          }).catch(error => {
            console.log(error)
          })
        }
      },
      setTeacherId(teacherId) {
        this.teacherId = teacherId
      },
      setSubjectId(subjectId) {
        this.subjectId = subjectId
      },
      getDayInitial(day) {
        if (day === 'Thursday') {
          return 'TH'
        }
        return day.substr(0, 1)
      },
      setScheduleDays() {
        this.scheduleDays = this.scheduleDaysArray.join('-');
      },
      setScheduleTime() {
        this.scheduleTime = this.scheduleTimeArr.join(' - ')
      }
    }
  }
</script>

<style scoped>
  .marginLabel {
    margin-top: 30px;
  }
</style>
