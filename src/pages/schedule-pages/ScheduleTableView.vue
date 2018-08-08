<template>
  <div class="container-fluid">
    <div class="row" style="margin-bottom: 15px">
      <a :href="link" download="schedule-report.pdf">
        <button class="btn btn-dark">Download Report</button>
      </a>
    </div>
    <div class="row justify-content-md-center">
      <table class="table table-hover table-bordered">
        <thead>
        <tr>
          <td>
            <b>Subject</b>
          </td>
          <td>
            <b>Teacher</b>
          </td>
          <td>
            <b>Days</b>
          </td>
          <td>
            <b>Time</b>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(schedule, index) in schedules">
          <td>{{ schedule.subject.subjectCode }} - {{ schedule.subject.subjectDescription }}</td>
          <td>{{ schedule.teacher.lastName }}, {{ schedule.teacher.firstName }} {{
            schedule.teacher.middleName.substr(0, 1) }}
          </td>
          <td>{{ schedule.days }}</td>
          <td>{{ schedule.time }}</td>
          <td>
          <button class="btn btn-success" @click="$router.push({name: 'schedule', params: {id: schedule.id}})">Update
          </button>
          <button class="btn btn-danger" @click="deleteSchedule({ id:schedule.id, index })">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="btn btn-dark" @click="$router.push({name: 'schedule', params: { id: 'new' } })">Create new
        Schedule
      </button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'AppSchedules',
    data() {
      return {
        ...mapActions([
          'initSchedules',
          'getScheduleReport'
        ]),
        link: ''
      }
    },
    methods: {
      deleteSchedule(id) {
        if (confirm("Do you want to delete the schedule?")) {
          this.$store.dispatch('deleteSchedule', id).catch(error => {
            console.log(error)
          })
        }
      },
      setLink() {
        this.getScheduleReport().then(response => {
          let pdfFile = new Blob([response], {type: 'application/pdf'});
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(pdfFile);
          this.link = link;
        }).catch(error => {
          console.log(error)
        })
      }
    },
    computed: {
      schedules() {
        return this.$store.state.scheduleModule.schedules
      }
    },
    created() {
      this.initSchedules()
      this.setLink()
    }
  }
</script>

<style></style>
