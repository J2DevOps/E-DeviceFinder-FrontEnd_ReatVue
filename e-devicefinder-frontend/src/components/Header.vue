<template>
  <header class="header">
    <nav>
      <div class="logo">
        <a href="#">
          <img :src="logo" alt="TrackIT Logo" class="logo" />
        </a>
      </div>

      

      <ul class="menu">      
        <li><a href="#">Home</a></li>
        

        <li class="search-container">
          <input type="text" placeholder="Search items..." class="search-bar" />
        </li>

        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact Us</a></li>
        <li><a href="#login">Login</a></li>
      </ul>

      
    </nav>
  </header>
</template>

<script>
import logo from '../assets/images/trackit-logo.png';


export default {
  name: 'Header',
  data() {
    return {
      logo, // Assign the imported image to data
    };
  },
}
</script>

<style scoped>

/* Header Styling */


.header {
  width: 100vw; /* Make sure it spans full width */
  max-width: 100%; /* Prevent overflow */
  position: relative; /* Ensures no unwanted positioning */
  left: 0;
  padding: 10px 0;
  text-align: center;
  background-color: #333;
  color: white;
  align-items: center;
}


nav {
  display: flex; /* Use flexbox to arrange items in a row */
  justify-content: space-between; /* Space out the menu and search */
  align-items: center; /* Vertically align items */
  width: 100vw;
}


.logo {
  width: 50px; /* Adjust the size of the logo */
  height: auto; /* Keep aspect ratio */
  border-radius: 70%;
  margin-left: 10px;
}

.menu {
  list-style-type: none;
  margin-right: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* Ensure the menu spans the available width */
}

.menu li {
  margin: 0 10px;
}

.menu a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

/* Hover Effect */
.menu a:hover {
  background-color: #555;
  color: #ffcc00;
  transform: scale(1.05);
}

/* Search Bar */
.search-container {
  display: flex;
  align-items: center;
}

.search-bar {
  width: 400px;
  background-color: white;
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  margin-left: 2px; /* Add some spacing between the navbar and the search bar */
  margin-right: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu {
    flex-direction: column;
    align-items: center;
  }

  .menu li {
    margin: 10px 0;
  }

  .menu a {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .menu a {
    font-size: 0.9rem;
    padding: 8px;
  }
}
</style>
