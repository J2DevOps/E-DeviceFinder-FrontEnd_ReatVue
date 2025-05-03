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

        <div class="button-group">
          <button type="submit" class="login-btn">Login</button>
          <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()
const emit = defineEmits(['close'])

async function handleLogin() {
  if (!email.value || !password.value) {
    alert('Please enter both email and password')
    return
  }

  try {
    const response = await axios.post('https://efapi20250503133217.azurewebsites.net/api/User/login', {
      email: email.value,
      password: password.value
    })

    console.log('Login Response:', response.data)

    const userInfo = response.data.userRsponse
    const userRole = response.data.userRole
    const userId = userInfo.id
    const token = response.data.token

    const fullName = `${userInfo.firstName ?? ''} ${userInfo.lastName ?? ''}`.trim()

    // Store UserId and token
    localStorage.setItem('UserId', userId)
    localStorage.setItem('token', token)
    localStorage.setItem('userEmail', userInfo.email)
    localStorage.setItem('userRole', userRole)
    localStorage.setItem('userName', fullName)

    // Redirect based on role
    if (userRole === 'Admin') {
      router.push('/admin')
    } else if (userRole === 'User') {
      router.push('/user')
    } else {
      alert('Unknown user role. Contact admin.')
    }

    emit('close')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Invalid credentials. Please try again.')
  }
}
</script>

<style scoped>


.login-card {
  background-color: #444;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 80%;
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

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
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

.cancel-btn {
  width: 100%;
  padding: 6px 14px;
  font-size: 0.85rem;
  background-color: transparent;
  border: 1px solid #ffcc00;
  color: #ffcc00;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background-color: #ffcc00;
  color: #333;
}
</style>
