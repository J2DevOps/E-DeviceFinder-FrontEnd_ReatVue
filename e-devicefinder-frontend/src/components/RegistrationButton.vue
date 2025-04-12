<template>
  <div class="register-button">
    <button @click="$emit('show-register')">Register</button>
  </div>
</template>

<script>
export default {
  name: 'RegisterButton',
}
</script>

<style scoped>
.register-button {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.register-button button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-button button:hover {
  background-color: #555;
  color: #ffcc00;
  transform: scale(1.05);
}

.register-button button:active {
  transform: scale(1);
}

.register-button button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.5);
}

@media (max-width: 768px) {
  .register-button button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
