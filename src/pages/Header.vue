<template>
  <div class="container">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <button class="btn btn-dark" @click="$router.push({name: 'home' })">Home</button>
      </li>
      <li class="nav-item">
        <button class="btn btn-dark" @click="$router.push({name: 'teachers' })">Teachers</button>
      </li>
      <li class="nav-item">
        <button class="btn btn-dark" @click="$router.push({name: 'subjects' })">Subjects</button>
      </li>
      <li class="nav-item">
        <button class="btn btn-dark" @click="$router.push({name: 'students' })">Students</button>
      </li>
      <li class="nav-item">
        <button class="btn btn-dark" @click="$router.push({name: 'schedules' })">Schedules</button>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
