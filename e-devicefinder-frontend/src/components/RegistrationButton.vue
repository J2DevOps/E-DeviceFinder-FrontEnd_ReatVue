<template>
  <div class="register-button">
    <button>Register</button>
  </div>
</template>

<script>
export default {
  name: 'RegisterButton',
};
</script>

<style scoped>
.register-button {
  display: flex;
  justify-content: center; /* Center the button horizontally */
  margin-top: 40px;
}

.register-button button {
  padding: 10px 20px; /* Padding for better touch targets */
  font-size: 1rem; /* Matches the menu font size */
  font-weight: bold; /* Bold text for emphasis */
  color: #fff; /* White text for contrast */
  background-color: #333; /* Matches the menu bar background color */
  border: none; /* Remove default border */
  border-radius: 5px; /* Rounded corners for a modern look */
  cursor: pointer; /* Pointer cursor for interactivity */
  transition: all 0.3s ease; /* Smooth transitions for hover effects */
}

/* Hover Effect */
.register-button button:hover {
  background-color: #555; /* Slightly lighter background on hover */
  color: #ffcc00; /* Matches the menu hover text color */
  transform: scale(1.05); /* Slight zoom effect */
}

/* Active State */
.register-button button:active {
  transform: scale(1); /* Reset zoom when clicked */
}

/* Focus State */
.register-button button:focus {
  outline: none; /* Remove default focus outline */
  box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.5); /* Custom focus ring matching the hover color */
}

/* Responsive Design */
@media (max-width: 768px) {
  .register-button button {
    font-size: 0.9rem; /* Smaller font size for smaller screens */
    padding: 8px 16px; /* Adjust padding for compactness */
  }
}
</style>