<template>
  <div class="container">
    <hr>
    <app-header></app-header>
    <hr>
    <div>
      <router-view></router-view>
    </div>
    <hr>
  </div>
</template>

<script>
  import TeacherTableView from './pages/TeacherTableView'
  import TeacherForm from './pages/TeacherForm'
  import Header from './pages/Header'
  import SubjectForm from './pages/subject-pages/SubjectForm'
  import SubjectTableView from './pages/subject-pages/SubjectTableView'
  import ScheduleForm from './pages/schedule-pages/ScheduleForm'
  import ScheduleTableView from './pages/schedule-pages/ScheduleTableView'
  import StudentForm from  './pages/student-pages/StudentForm'
  import StudentTableView from './pages/student-pages/StudentTableView'

  export default {
    components: {
      appTeacherForm: TeacherForm,
      appTeacherTableView: TeacherTableView,
      appSubjectForm: SubjectForm,
      appSubjectTableView: SubjectTableView,
      appHeader: Header,
      appScheduleForm: ScheduleForm,
      appScheduleTableView: ScheduleTableView,
      appStudentForm : StudentForm,
      appStudentTableView: StudentTableView
    }
  }
</script>

<style>

</style>
