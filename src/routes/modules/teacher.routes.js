import TeacherForm from '../../pages/TeacherForm'
import TeacherTableView from '../../pages/TeacherTableView'
import Home from '../../pages/Home'

export const teacherRoutes = [
  { path: '/teachers', component: TeacherTableView, name: 'teachers' },
  { path: '/teacher/:id', component: TeacherForm, name: 'teacher' },
  { path: '/', component: Home, name: 'home'}
]
