<template>
  <div class="admin-container">
    <!-- Menu Tabs -->
    <div class="menu-tabs">
      <button @click="currentView = 'users'">Users</button>
      <button @click="currentView = 'reports'">Reports</button>
      <button @click="currentView = 'approved'">Approved</button>
      <button @click="currentView = 'rejected'">Rejected</button>
    </div>

    <!-- Users Table -->
    <div v-if="currentView === 'users'">
      <h2>Users</h2>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td class="text-right relative">
              <button @click="toggleDropdown(index)" class="action-btn">
                Actions
              </button>
              <div v-if="activeDropdown === index" class="dropdown">
                <ul>
                  <li @click="handleAction(user, 'Edit')">Decline</li>
                  <li @click="handleAction(user, 'delete')">Delete</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Reports Table -->
    <div v-if="currentView === 'reports'">
      <h2>Reports</h2>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Report Type</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reports" :key="index">
            <td>{{ report.title }}</td>
            <td>{{ report.description }}</td>
            <td>{{ getReportType(report.itemCategory) }}</td>
            <td>{{ report.status }}</td>
            
          </tr>
        </tbody>
      </table>
      
    </div>

    <!-- Approved Reports -->
    <div v-if="currentView === 'approved'">
      <h2>Approved Reports</h2>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in approvedReports" :key="index">
            <td>{{ report.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Rejected Reports -->
    <div v-if="currentView === 'rejected'">
      <h2>Rejected Reports</h2>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in rejectedReports" :key="index">
            <td>{{ report.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ReportForm from '../components/ReportForm.vue'

const currentView = ref('users')
const activeDropdown = ref(null)
const users = ref([])
const reports = ref([])

const router = useRouter()

function goToCreateReport() {
  router.push('/create-report')
}

const approvedReports = computed(() =>
  reports.value.filter((r) => r.status === 'approved')
)
const rejectedReports = computed(() =>
  reports.value.filter((r) => r.status === 'rejected')
)

onMounted(async () => {
  try {
    const userResponse = await axios.get(
      'https://efapi20250412004655.azurewebsites.net/api/User/users'
    )
    if (userResponse.status === 200 && userResponse.data.result) {
      users.value = userResponse.data.result
    } else {
      console.error('Failed to load users:', userResponse.data.message)
    }

    const reportResponse = await axios.get(
      'https://efapi20250412004655.azurewebsites.net/api/Report/reports'
    )
    if (reportResponse.status === 200 && reportResponse.data.result) {
      reports.value = reportResponse.data.result.map((report) => ({
        ...report,
        status: 'pending',
      }))
    } else {
      console.error('Failed to load reports:', reportResponse.data.message)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

function getReportType(itemCategoryCode) {
  if (itemCategoryCode === 0) return 'Lost'
  if (itemCategoryCode === 1) return 'Stolen'
  return 'Unknown'
}

function toggleDropdown(index) {
  activeDropdown.value = activeDropdown.value === index ? null : index
}

function handleAction(user, action) {
  alert(`${action.toUpperCase()} user: ${user.firstName} ${user.lastName}`)
  activeDropdown.value = null
}
</script>

<style scoped>
.admin-container {
  background-color: #333;
  color: white;
  padding: 2rem;
  min-height: 100vh;
}

.menu-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.menu-tabs button {
  background-color: #555;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-tabs button:hover {
  background-color: #666;
  color: #ffcc00;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #444;
  border-radius: 10px;
  overflow: hidden;
}

.admin-table th,
.admin-table td {
  padding: 1rem;
  border-bottom: 1px solid #555;
  text-align: left;
}

.admin-table th {
  background-color: #222;
  color: #ffcc00;
}

.admin-table tr:hover {
  background-color: #555;
}

.action-btn {
  background-color: #555;
  color: #fff;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background-color: #666;
  color: #ffcc00;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 40px;
  background-color: #222;
  border: 1px solid #555;
  border-radius: 6px;
  z-index: 20;
  width: 120px;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
  color: white;
}

.dropdown li:hover {
  background-color: #444;
  color: #ffcc00;
}

.text-right {
  text-align: right;
}
</style>
