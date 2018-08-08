import ScheduleTableView from '../../pages/schedule-pages/ScheduleTableView'
import ScheduleForm from '../../pages/schedule-pages/ScheduleForm'

export const scheduleRoutes = [
  { path: '/schedules', component: ScheduleTableView, name: 'schedules' },
  { path: '/schedule/:id', component: ScheduleForm, name: 'schedule' }
]
