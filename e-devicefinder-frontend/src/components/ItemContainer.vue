<template>
  <div class="items-container">
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
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'; // Correct import for Swiper core styles
import 'swiper/css/autoplay'; // Import Autoplay styles if you're using autoplay
import download from '../assets/images/download.jpeg';
import Image2 from '../assets/images/Image2.jpeg';
import Image3 from '../assets/images/Image3.jpeg';
import Image4 from '../assets/images/Image4.jpeg';

export default {
  name: 'ItemsContainer',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      missingItems: [
        { 
          image: download, 
          alt: 'missing-item-1' 
        },
        { 
          image: Image2, 
          alt: 'missing-item-2' 
        },
      ],
      foundItems: [
        { 
          image: Image3, 
          alt: 'found-item-1' 
        },
        { 
          image: Image4, 
          alt: 'found-item-2' 
        },
      ],
    };
  },
};
</script>

<style scoped>
/* General Styling */
.items-container {
  display: flex;
  justify-content: space-around;
  width: 90%;
  margin: 40px auto; /* Centered container with spacing */
}

.column {
  width: 45%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.column:hover {
  transform: translateY(-10px); /* Subtle hover effect */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.column h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  width: 50%;
  max-width: 100px; /* Restrict image size for consistency */
  height: auto;
  border-radius: 15px;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
}

.swiper-slide:hover img {
  transform: scale(1.1); /* Zoom effect on hover */
}

/* Responsive Design */
@media (max-width: 768px) {
  .items-container {
    flex-direction: column;
    width: 95%;
  }

  .column {
    width: 100%;
    margin-bottom: 20px;
  }

  .column h2 {
    font-size: 1.2rem;
  }
}
</style>