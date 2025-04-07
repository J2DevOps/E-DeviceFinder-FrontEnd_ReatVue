<template>
  <header class="header">
    <nav>
      <div class="logo">
        <router-link to="/">
          <img :src="logo" alt="TrackIT Logo" class="logo" />
        </router-link>
      </div>

      <ul class="menu nav-items">
        <!-- If on /admin route, show Create Report + Logout on the right -->
        <li v-if="isAdmin" class="create-report">
          <a href="#" @click.prevent="createReport">Create Report</a>
        </li>
        <li v-if="isAdmin" class="logout">
          <a href="#" @click.prevent="logout">Logout</a>
        </li>

        <!-- If not admin, show full menu -->
        <template v-else>
          <li><router-link to="/">Home</router-link></li>
          <li class="search-container">
            <!-- Bind input value to searchTerm -->
            <input 
              type="text" 
              placeholder="Search items..." 
              class="search-bar" 
              v-model="searchTerm"
              @input="handleSearch"
            />
          </li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li>
            <a href="#" @click.prevent="$emit('show-login')">Login</a>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import logo from '../assets/images/trackit-logo.png'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()

// Reactive data for search term
const searchTerm = ref('')

// Computed to check if we're on the /admin route
const isAdmin = computed(() => route.path.startsWith('/admin'))


// Handle the search query and emit it
const handleSearch = () => {
  // Emit the search term to parent component or handle the logic here
  emit('update:search', searchTerm.value)
}

// Create Report functionality
const createReport = () => {
  router.push('/admin/create-report') // This should now properly route to the ReportForm component
}

function logout() {
  router.push('/') // Navigate to the home page after logout
}
</script>

<style scoped>
.header {
  width: 100vw;
  max-width: 100%;
  position: relative;
  left: 0;
  padding: 10px 0;
  text-align: center;
  background-color: #333;
  color: white;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-between; /* Align logo to the left, menu to the right */
  align-items: center;
  width: 100vw;
}

.nav-items {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end; /* Align the menu to the right */
  align-items: center;
}

.logo {
  width: 50px;
  height: auto;
  border-radius: 70%;
  margin-left: 10px;
}

.menu {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.menu li {
  margin: 0 10px;
}

.menu li.logout,
.menu li.create-report {
  margin-left: 15px; /* Space between Create Report and Logout */
}

.menu a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.menu a:hover {
  background-color: #555;
  color: #ffcc00;
  transform: scale(1.05);
}

.search-container {
  display: flex;
  align-items: center;
}

.search-bar {
  width: 400px;
  background-color: white;
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  margin: 0 2px;
}

@media (max-width: 768px) {
  .menu {
    flex-direction: column;
    align-items: center;
  }

  .menu li {
    margin: 10px 0;
  }

  .menu a {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .menu a {
    font-size: 0.9rem;
    padding: 8px;
  }
}
</style>

