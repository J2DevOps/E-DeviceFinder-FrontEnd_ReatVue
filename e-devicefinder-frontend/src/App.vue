<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import ItemContainer from './components/ItemContainer.vue'
import RegisterButton from './components/RegistrationButton.vue'
import SignUp from './components/SignUp.vue'
import SearchBox from './components/SearchBox.vue'

const showLogin = ref(false)
const showRegister = ref(false)
const route = useRoute()

const searchResults = ref([])

const handleSearch = async (term) => {
  if (!term) {
    searchResults.value = []
    return
  }

  try {
    const response = await axios.get(`https://localhost:7130/api/Item/search?query=${term}`)
    searchResults.value = response.data.result
  } catch (error) {
    console.error('Search failed:', error)
    searchResults.value = []
  }
}

const handleLoginClose = () => {
  showLogin.value = false
}
</script>
<template>
  <div class="app-container">
    <Header @show-login="showLogin = true" />

    <!-- Render home content only if route is '/' -->
    <template v-if="route.path === '/'">
      <SearchBox @search="handleSearch" />
      <ItemContainer
        :search-results="searchResults"
        :show-login="showLogin"
        :show-register="showRegister"
        @close-login="showLogin = false"
        @close-register="showRegister = false"
      />
      <main class="content">
        <p>Register to Claim, Track or Report Lost Items</p>
        <RegisterButton @show-register="showRegister = true" />
      </main>
    </template>

    <!-- Show router-view only when NOT on the homepage -->
    <template v-else>
      <router-view />
    </template>

    <footer class="footer">
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

