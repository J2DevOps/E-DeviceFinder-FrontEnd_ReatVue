<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Welcome Back</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter() 
const emit = defineEmits(['close'])

function handleLogin() {
  // Simulated login check (add real logic later)
  if (email.value && password.value) {
    // Navigate to Admin Page
    router.push('/admin')
    emit('close') 
  } else {
    alert('Please enter both email and password')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  height: 62vh;
  padding: 1rem;
  border-radius: 12px;
  opacity: 2.8; /* Reduces opacity to 80% */

}

.login-card {
  background-color: #444;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 400px;
  color: white;
}

.login-title {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffcc00;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.input-group input {
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #555;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background-color: #666;
  color: #ffcc00;
}
</style>