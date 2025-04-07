import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from './pages/AdminPage.vue'
import ReportForm from './components/ReportForm.vue'

const routes = [
    { path: '/admin', component: AdminPage },
    { path: '/admin/create-report', component: ReportForm }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
