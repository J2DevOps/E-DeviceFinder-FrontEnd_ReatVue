import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from './pages/AdminPage.vue'
import ReportForm from './components/ReportForm.vue'
import AboutUs from  './pages/AboutUs.vue'

const routes = [
    { path: '/admin', component: AdminPage},
    { path: '/aboutus', component: AboutUs},
    { path: '/admin/create-report', component: ReportForm }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
