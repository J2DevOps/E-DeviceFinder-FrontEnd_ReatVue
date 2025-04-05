import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from './pages/AdminPage.vue'

const routes = [
    { path: '/admin', component: AdminPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
 