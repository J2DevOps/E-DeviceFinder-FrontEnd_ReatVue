<script setup>
import Header from './components/Header.vue';
import SearchBox from './components/SearchBox.vue';
import ItemContainer from './components/ItemContainer.vue';
import RegisterButton from './components/RegistrationButton.vue';
</script>

<template>
  <div class="app-container">
    <!-- Header Component -->
    <Header />
    <SearchBox />
    <ItemContainer />
    <RegisterButton />

    <!-- Main Content -->
    <main class="content">
      <p>Register to Track or Report Lost Items</p>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures full viewport height */
}

.content {
  flex: 1; /* Pushes the footer to the bottom */
  padding: 20px;
  text-align: center;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content h1 {
    font-size: 1.5rem;
  }

  .content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .content h1 {
    font-size: 1.2rem;
  }

  .content p {
    font-size: 0.9rem;
  }
}
</style>