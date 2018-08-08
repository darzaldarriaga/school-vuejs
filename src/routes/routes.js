import {teacherRoutes} from "./modules/teacher.routes";
import {subjectRoutes} from "./modules/subject.routes";
import {scheduleRoutes} from "./modules/schedule.routes";
import {studentRoutes} from "./modules/student.routes";
import VueRouter from "vue-router";

const router = new VueRouter({
  routes: [
    ...teacherRoutes,
    ...subjectRoutes,
    ...scheduleRoutes,
    ...studentRoutes
  ],
  mode: 'history'
});

export default router
