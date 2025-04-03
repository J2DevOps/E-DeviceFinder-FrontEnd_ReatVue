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
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

html, body {
  margin: 0;
  padding: 0;
  width: 100vw;  /* Full width */
  height: 100vh; /* Full height */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
  width: 100vw; /* Ensure it spans the full width */
  overflow-x: hidden;
}


body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  line-height: 1.6;
  width: 100%;
  height: 100%; /* Ensure the body also fills the viewport height */
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

.header, .footer {
  width: 100vw; /* Make sure it spans full width */
  max-width: 100%; /* Prevent overflow */
  position: relative; /* Ensures no unwanted positioning */
  left: 0;
  padding: 10px 0;
  text-align: center;
  background-color: #333;
  color: white;
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
