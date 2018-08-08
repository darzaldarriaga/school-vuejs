import SubjectForm from '../../pages/subject-pages/SubjectForm'
import SubjectTableView from '../../pages/subject-pages/SubjectTableView'

export const subjectRoutes = [
  { path: '/subjects', component: SubjectTableView, name: 'subjects' },
  { path: '/subjects/:id', component: SubjectForm, name: 'subject' }
]
