<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import LoginCard from './components/LoginCard.vue'
import ItemContainer from './components/ItemContainer.vue'
import RegisterButton from './components/RegistrationButton.vue'
import SignUp from './components/SignUp.vue'

const showLogin = ref(false)
const showRegister = ref(false)
const route = useRoute()
</script>

<template>
  <div class="app-container">
    <!-- Header -->
    <Header @show-login="showLogin = true" />

    <!-- Login Modal -->
    <LoginCard
      v-if="showLogin"
      class="login-modal"
      @click.self="showLogin = false"
      @close="showLogin = false"
    />

    <!-- Signup Modal -->
    <SignUp
      v-if="showRegister"
      class="login-modal"
      @click.self="showRegister = false"
      @close="showRegister = false"
    />

    <!-- Main content for non-admin and non-user routes -->
    <template v-if="!route.path.startsWith('/admin') && !route.path.startsWith('/user')">
      <ItemContainer />
      <RegisterButton @show-register="showRegister = true" />
      <main class="content">
        <p>Register to Track or Report Lost Items</p>
      </main>
    </template>

    <!-- Router View -->
    <router-view />

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.login-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.content {
  flex: 1;
  padding: 20px;
  text-align: center;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}
</style>
