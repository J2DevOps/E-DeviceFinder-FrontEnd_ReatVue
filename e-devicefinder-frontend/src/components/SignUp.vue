<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2 class="signup-title">Create Account</h2>

      <form @submit.prevent="handleSignUp">
        <div class="input-group">
          <label for="firstName">First Name</label>
          <input type="text" v-model="firstName" id="firstName" required />
        </div>

        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input type="text" v-model="lastName" id="lastName" required />
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>

        <div class="button-group">
          <button type="submit" class="signup-btn" :disabled="loading">
            {{ loading ? 'Signing up...' : 'Sign Up' }}
          </button>
          <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        </div>
      </form>

      <!-- Success message -->
      <div v-if="success" class="success-message">
        ✅ Registration successful!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const success = ref(false)
const emit = defineEmits(['close'])

async function handleSignUp() {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    alert('Please fill out all fields.')
    return
  }

  try {
    loading.value = true

    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    }

    const response = await axios.post(
      'https://efapi20250412004655.azurewebsites.net/api/User/create',
      payload
    )

    if (response.status === 200 || response.status === 201) {
      success.value = true
      setTimeout(() => {
        emit('close') // Close modal after short delay
      }, 1500)
    } else {
      alert('Registration failed. Please try again.')
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  height: 90vh;
  padding: 1rem;
  border-radius: 12px;
}

.signup-card {
  background-color: #444;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 400px;
  color: white;
  position: relative;
}

.signup-title {
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
  justify-content: space-between;
  gap: 1rem;
}

.signup-btn,
.cancel-btn {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.signup-btn {
  background-color: #555;
  color: white;
  transition: background 0.3s ease;
}

.signup-btn:hover {
  background-color: #666;
  color: #ffcc00;
}

.cancel-btn {
  background-color: transparent;
  color: #ffcc00;
  border: 1px solid #ffcc00;
  transition: background 0.3s ease;
}

.cancel-btn:hover {
  background-color: #ffcc00;
  color: #333;
}

.success-message {
  margin-top: 1rem;
  text-align: center;
  color: #ffcc00;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
