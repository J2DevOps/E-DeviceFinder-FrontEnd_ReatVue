<template>
  <div class="report-form-container">
    <h2>Create a New Report</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Title -->
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          placeholder="Enter the title of the report"
          required
        />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Enter a description of the report"
          required
        ></textarea>
      </div>

      <!-- Report Type (Dropdown) -->
      <div class="form-group">
        <label for="type">Report Type</label>
        <select
          id="type"
          v-model="formData.type"
          required
        >
          <option value="">Select Report Type</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      <!-- Item -->
      <div class="form-group">
        <h3>Item Details</h3>

        <!-- Item Name -->
        <label for="itemName">Item Name</label>
        <input
          type="text"
          id="itemName"
          v-model="formData.item.name"
          placeholder="Enter the name of the item"
          required
        />

        <!-- Item Category -->
        <div>
          <label for="category">Item Category</label>
          <select
            id="category"
            v-model="formData.item.category"
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Documents">Documents</option>
            <!-- Add more options as needed -->
          </select>
        </div>

        <!-- Item Description -->
        <label for="itemDescription">Item Description</label>
        <textarea
          id="itemDescription"
          v-model="formData.item.description"
          placeholder="Enter a description of the item"
          required
        ></textarea>

        <!-- Serial Number -->
        <label for="serialNumber">Serial Number</label>
        <input
          type="text"
          id="serialNumber"
          v-model="formData.item.serialNumber"
          placeholder="Enter the serial number of the item"
          required
        />

        <!-- Image -->
        <label for="itemImage">Item Image</label>
        <input
          type="file"
          id="itemImage"
          @change="handleImageChange"
        />
      </div>

      <!-- Submit Button -->
      <button type="submit">Submit Report</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  title: '',
  description: '',
  type: '', // Lost or Found
  item: {
    name: '',
    category: '', // Electronics, Accessories, etc.
    description: '',
    serialNumber: '',
    image: null, // File object
  },
  userId: '',
})

// Handle image file change (for file input)
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.item.image = file
  }
}

// Handle form submission
const handleSubmit = () => {
  // Create the form data object to send to the API
  const reportRequest = {
    ...formData.value,
    item: {
      ...formData.value.item,
      image: formData.value.item.image, // You might need to upload this image separately or handle as base64 string
    },
  }

  // Example of logging the report to the console for now
  console.log('Report submitted:', reportRequest)

  // You can send this data to the backend using axios or fetch
  // For example, if you have an API endpoint, you would call:
  // axios.post('YOUR_API_URL', reportRequest).then(response => {
  //   console.log('Response from server:', response.data)
  // })
}
</script>

<style scoped>
.report-form-container {
  background-color: #333;
  color: white;
  padding: 2rem;
  min-height: 60vh;
  width: 60%;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left; /* Ensure label text is aligned to the left */
}

input[type="text"],
input[type="file"],
select,
textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #444;
  color: white;
}

textarea {
  min-height: 100px;
}

button {
  background-color: #ffcc00;
  color: #333;
  padding: 1rem 2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1.1rem;
}

button:hover {
  background-color: #e6b800;
}
</style>
