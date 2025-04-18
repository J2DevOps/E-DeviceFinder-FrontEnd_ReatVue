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

      <!-- Report Type -->
      <div class="form-group">
        <label for="type">Report Type</label>
        <select id="type" v-model="formData.type" required>
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
        <label for="category">Item Category</label>
        <select id="category" v-model="formData.item.category" required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Documents">Documents</option>
        </select>

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
          placeholder="Optional"
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  title: '',
  description: '',
  category: '',
  type: '',
  userId: '',
  item: {
    name: '',
    category: '',
    description: '',
    serialNumber: '',
    image: null,
    userId: '',
  },
})

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.item.image = file
  }
}

const handleSubmit = async () => {
  const storedUserId = localStorage.getItem('UserId')

  if (!storedUserId) {
    alert('User not authenticated. Please log in again.')
    return
  }

  formData.value.userId = storedUserId
  formData.value.item.userId = storedUserId

  const form = new FormData()

  const categoryEnumMap = {
    Electronics: 1,
    Documents: 2,
    Accessories: 3,
  }

  const reportTypeEnumMap = {
    Lost: 1,
    Found: 2,
  }

  form.append('Title', formData.value.title)
  form.append('Description', formData.value.description)
  form.append('Category', categoryEnumMap[formData.value.item.category])
  form.append('Type', reportTypeEnumMap[formData.value.type])
  form.append('UserId', formData.value.userId)

  form.append('Item.Name', formData.value.item.name)
  form.append('Item.Category', categoryEnumMap[formData.value.item.category])
  form.append('Item.Description', formData.value.item.description)
  form.append('Item.SerialNumber', formData.value.item.serialNumber)
  form.append('Item.UserId', formData.value.item.userId)

  if (formData.value.item.image) {
    form.append('Item.Image', formData.value.item.image)
  }

  try {
    const response = await axios.post('https://localhost:7130/api/Report', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Success:', response.data)
    router.push('/admin') // 👈 Redirect to Admin page
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to submit report.')
  }
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
  text-align: left;
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
