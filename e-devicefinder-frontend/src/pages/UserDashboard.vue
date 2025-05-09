<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Dashboard</h2>
      <ul class="sidebar-menu">
        <li>Overview</li>
        <li>My Reports</li>
        <li>Items Found</li>
        <li>Settings</li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="dashboard-header">
        <h1>Welcome, {{ username }}</h1>
      </header>

      <section class="cards">
        <div class="card">
          <h3>Reports Submitted</h3>
          <p>12</p>
        </div>
        <div class="card">
          <h3>Items Found</h3>
          <p>5</p>
        </div>
        <div class="card">
          <h3>Pending Approvals</h3>
          <p>2</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Get the username from localStorage
const username = ref(localStorage.getItem('userName') || 'User')

const logout = () => {
  localStorage.removeItem('username') // Clear stored username
  router.push('/') // Redirect to home or login
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #333;
  color: white;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #222;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  font-size: 1.5rem;
  color: #ffcc00;
  margin-bottom: 2rem;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  font-weight: bold;
}

.sidebar-menu li {
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.3s;
}

.sidebar-menu li:hover {
  color: #ffcc00;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 2rem;
  background-color: #333;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #ffcc00;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #666;
  color: #ffcc00;
}

/* Cards */
.cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background-color: #444;
  padding: 2rem;
  border-radius: 12px;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
}

.card h3 {
  margin-bottom: 1rem;
  color: #ffcc00;
}

.card p {
  font-size: 2rem;
  font-weight: bold;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
