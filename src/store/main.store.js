import Vue from 'vue';
import Vuex from 'vuex';
import { teacherModule } from './modules/teacher.store';
import { subjectModule } from './modules/subject.store';
import { scheduleModule } from "./modules/schedule.store";
import { studentModule } from "./modules/student.store";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    teacherModule,
    subjectModule,
    scheduleModule,
    studentModule
  }
});
