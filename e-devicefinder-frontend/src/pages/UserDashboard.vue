<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Dashboard</h2>
      <ul class="sidebar-menu">
        <li>My Reports</li>
        <li>Settings</li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="dashboard-header">
        <h1>Welcome, {{ username }}</h1>
      </header>

      <!-- Search Box -->
      <div class="search-box">
        <input
          v-model="searchTerm"
          @input="handleSearch"
          type="text"
          placeholder="Search for a missing item"
        />
      </div>

      <!-- Result Table -->
      <table v-if="searchResult && searchResult.length > 0" class="result-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item ID</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchResult" :key="index">
            <td>{{ item.name ?? 'N/A' }}</td>
            <td>{{ item.id ?? 'N/A' }}</td>
            <td>
              <a :href="item.imageUrl" target="_blank">View Image</a>
            </td>
            <td>
              <button @click="claimItem(item)">Claim Item</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- No Results Message -->
      <p v-else-if="searchTerm.trim() !== ''">No results found.</p>

      <!-- Claim Form -->
      <div v-if="isClaiming" class="claim-form">
        <h3>Claim Item</h3>
        <form @submit.prevent="submitClaim">
          <div class="form-group">
            <label for="itemId">Item ID</label>
            <input type="text" id="itemId" v-model="claimForm.itemId" disabled />
          </div>

          <div class="form-group">
            <label for="itemName">Item Name</label>
            <input type="text" id="itemName" v-model="claimForm.itemName" disabled />
          </div>

          <div class="form-group">
            <label for="claimReason">Claim Reason</label>
            <textarea id="claimReason" v-model="claimForm.claimReason" required placeholder="Enter your reason"></textarea>
          </div>

          <button type="submit">Submit Claim</button>
        </form>
        <p v-if="message" :class="messageClass">{{ message }}</p>
      </div>
    </main>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'

// User data from localStorage
const username = ref(localStorage.getItem('userName') || 'User')

// Search term and results
const searchTerm = ref('')
const searchResult = ref([])

// Debounce function to limit API calls
let debounceTimer
const handleSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (!searchTerm.value.trim()) {
      searchResult.value = [] // Clear results if search box is empty
      clearClaimForm() // Clear claim form
      return
    }
    searchItem()
  }, 500) // Adjust debounce delay as needed (e.g., 500ms)
}

// Perform the API search
const searchItem = async () => {
  try {
    const response = await axios.get(
      `https://efapi20250503133217.azurewebsites.net/api/Item/search?query=${searchTerm.value}`
    )
    console.log('API Response:', response.data)
    searchResult.value = response.data.result || []
  } catch (error) {
    console.error('Search failed:', error.message || error)
    searchResult.value = []
  }
}

// Claim form state
const claimForm = ref({
  userId: localStorage.getItem('userId') || '', // UserId from localStorage
  itemId: '',
  itemName: '',
  claimReason: ''
})

const isClaiming = ref(false) // Flag to show claim form
const message = ref('')
const messageClass = ref('')

// Claim an item when user clicks the "Claim Item" button
const claimItem = (item) => {
  claimForm.value.itemId = item.id
  claimForm.value.itemName = item.name
  isClaiming.value = true
}


// Submit the claim form to the API
const submitClaim = async () => {
  try {
    const response = await axios.post(
      'https://efapi20250503133217.azurewebsites.net/api/Claim',
      claimForm.value
    )
    message.value = 'Claim submitted successfully!'
    messageClass.value = 'success'
    isClaiming.value = false
    // Optionally reset the form after success
    claimForm.value.claimReason = ''
  } catch (error) {
    message.value = 'Failed to submit claim. Please try again.'
    messageClass.value = 'error'
    console.error('Claim submission failed:', error)
  }
}


// Clear the claim form when the search box is empty
const clearClaimForm = () => {
  claimForm.value.itemId = ''
  claimForm.value.itemName = ''
  claimForm.value.claimReason = ''
  isClaiming.value = false
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

/* Search */
.search-box {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}


.search-box input {
  flex-grow: 1;  /* Makes the input field grow to take up available space */
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
}

.search-box button {
  padding: 0.5rem;
  background-color: #ffcc00;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 0.5rem;  /* Optional: adds some space between the input and button */
}


/* Result Table */
.result-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.result-table th,
.result-table td {
  border: 1px solid #555;
  padding: 0.75rem;
  text-align: left;
}

.result-table th {
  background-color: #444;
  color: #ffcc00;
}

.result-table td a {
  color: #4ea1ff;
  text-decoration: underline;
}

.result-table button {
  background-color: #4caf50;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.result-table button:hover {
  background-color: #45a049;
}

/* Modernized Claim Form */
.claim-form {
  background-color: #fff; /* Clean white background */
  padding: 1.5rem; /* Slightly increased padding for better breathing room */
  border-radius: 12px; /* More pronounced rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* More subtle, modern shadow */
  width: 100%;
  max-width: 400px; /* Slightly wider for better layout */
  margin: 3rem auto; /* Increased vertical margin for better separation */
  border: 1px solid #eee; /* Light border for definition */
}

.claim-form h3 {
  text-align: center;
  margin-bottom: 1.5rem; /* Increased margin for better separation */
  font-size: 1.5rem; /* Slightly larger, more prominent heading */
  color: #333; /* Darker, more readable heading color */
}

.form-group {
  margin-bottom: 1.2rem; /* Increased spacing between form groups */
}

.form-group label {
  display: block; /* Ensures label takes full width */
  font-weight: 500; /* Semi-bold for better readability */
  margin-bottom: 0.5rem; /* Slightly increased spacing */
  font-size: 1rem; /* Slightly larger, more readable label */
  color: #555; /* Slightly darker label color */
}

.form-group input,
.form-group textarea {
  width: calc(100% - 1.2rem); /* Adjust width for padding and border */
  padding: 0.8rem; /* Slightly increased padding */
  font-size: 1rem; /* Slightly larger, more readable input text */
  border: 1px solid #ddd; /* Lighter border */
  border-radius: 8px; /* More pronounced rounded corners for inputs */
  box-sizing: border-box; /* Ensures padding and border are included in the element's total width and height */
  transition: border-color 0.2s ease-in-out; /* Subtle transition on focus */
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none; /* Remove default focus outline */
  border-color: #007bff; /* Modern focus color (you can adjust) */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Subtle focus shadow */
}

.form-group textarea {
  resize: vertical;
  min-height: 100px; /* Slightly increased minimum height */
}

.form-group .error-message {
  color: #dc3545; /* Standard error color */
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

/* Optional: Styling for buttons (if you have any within the form) */
.claim-form button {
  background-color: #007bff; /* Modern primary button color */
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.claim-form button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.claim-form button:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

button {
  width: 100%;
  padding: 0.7rem; /* Reduced padding */
  background-color: #ffcc00;
  color: white;
  font-weight: bold;
  font-size: 0.9rem; /* Smaller font size */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e6b800;
}

.success {
  color: green;
  text-align: center;
  font-size: 0.9rem; /* Smaller font size */
}

.error {
  color: red;
  text-align: center;
  font-size: 0.9rem; /* Smaller font size */
}
</style>
