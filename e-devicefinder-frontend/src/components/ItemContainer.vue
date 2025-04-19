<template>
  <div class="items-container">
    <!-- Login Modal -->
    <div v-if="showLogin" class="modal-overlay" @click.self="$emit('close-login')">
      <LoginCard @close="$emit('close-login')" />
    </div>

    <!-- Signup Modal -->
    <div v-if="showRegister" class="modal-overlay" @click.self="$emit('close-register')">
      <SignUp @close="$emit('close-register')" />
    </div>

    <!-- Search Results Table -->
    <div v-if="searchResults && searchResults.length > 0" class="search-results">
      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchResults" :key="index">
            <td><img :src="item.imageUrl" alt="item" class="table-img" /></td>
            <td>{{ item.name }}</td>
            <td>{{ getCategoryName(item.category) }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Default Swipers -->
    <template v-else>
      <div class="column">
        <h2>Missing Items</h2>
        <swiper :slidesPerView="1" :loop="true" :autoplay="{ delay: 3000 }">
          <swiper-slide v-for="(item, index) in missingItems" :key="index">
            <img :src="item.image" :alt="item.alt" />
          </swiper-slide>
        </swiper>
      </div>

      <div class="column">
        <h2>Found Items</h2>
        <swiper :slidesPerView="1" :loop="true" :autoplay="{ delay: 3000 }">
          <swiper-slide v-for="(item, index) in foundItems" :key="index">
            <img :src="item.image" :alt="item.alt" />
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import LoginCard from './LoginCard.vue'
import SignUp from './SignUp.vue'
import download from '../assets/images/download.jpeg'
import Image2 from '../assets/images/Image2.jpeg'
import Image3 from '../assets/images/Image3.jpeg'
import Image4 from '../assets/images/Image4.jpeg'

export default {
  name: 'ItemContainer',
  components: {
    Swiper,
    SwiperSlide,
    LoginCard,
    SignUp,
  },
  props: {
    searchResults: {
      type: Array,
      default: () => [],
    },
    showLogin: {
      type: Boolean,
      default: false,
    },
    showRegister: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { modules: [Autoplay] }
  },
  data() {
    return {
      missingItems: [
        { image: download, alt: 'missing-item-1' },
        { image: Image2, alt: 'missing-item-2' },
      ],
      foundItems: [
        { image: Image3, alt: 'found-item-1' },
        { image: Image4, alt: 'found-item-2' },
      ],
      categoryMap: {
        1: 'Electronics',
        2: 'Documents',
        3: 'Accessories',
      },
    }
  },
  methods: {
    getCategoryName(code) {
      return this.categoryMap[code] || 'Unknown'
    },
  },
}
</script>

<style scoped>
.items-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 70%;
  margin: 40px auto;
  position: relative;
}
.column {
  width: 45%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}
.search-results {
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 12px;
}
.table-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
