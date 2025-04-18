import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from './pages/AdminPage.vue'
import ReportForm from './components/ReportForm.vue'
import AboutUs from './pages/AboutUs.vue'
import ContactUs from './pages/ContactUs.vue'
import UserDashboard from './pages/UserDashboard.vue'

const routes = [
    { path: '/aboutus', component: AboutUs },
    { path: '/contactus', component: ContactUs },

    // User route - Requires login
    {
        path: '/user',
        component: UserDashboard,
        meta: { requiresAuth: true }
    },

    // Admin route - Requires Admin role
    {
        path: '/admin',
        component: AdminPage,
        meta: { requiresAuth: true, requiresRole: 'Admin' }
    },

    // Admin report creation route - Requires Admin role
    {
        path: '/admin/create-report',
        component: ReportForm,
        meta: { requiresAuth: true, requiresRole: 'Admin' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
    const userId = localStorage.getItem('UserId')
    const userRole = localStorage.getItem('userRole')

    // Check if the route requires authentication
    if (to.meta.requiresAuth && !userId) {
        // Redirect to login page if not authenticated
        return next({ path: '/login' })
    }

    // Check if the route requires a specific role (e.g., 'Admin')
    if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
        // Redirect to the user dashboard or another route if the role is not allowed
        return next({ path: '/user' })
    }

    // If all checks pass, allow navigation
    next()
})

export default router
