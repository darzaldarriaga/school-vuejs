import StudentForm from '../../pages/student-pages/StudentForm';
import StudentTableView from '../../pages/student-pages/StudentTableView';

export const studentRoutes = [
  { path: '/student/:id', component: StudentForm, name: 'student' },
  { path: '/student', component: StudentTableView, name: 'students' }
]
