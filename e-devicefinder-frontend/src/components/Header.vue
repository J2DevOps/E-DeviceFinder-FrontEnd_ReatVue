<template>
  <header class="header">
    <nav>
      <ul class="menu">
        <li><a href="#signup">Sign Up</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
/* Header Styling */
.header {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky; /* Keeps the header at the top while scrolling */
  top: 0;
  z-index: 1000; /* Ensures it stays above other content */
}

.menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allows items to wrap on smaller screens */
}

.menu li {
  margin: 0 15px;
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