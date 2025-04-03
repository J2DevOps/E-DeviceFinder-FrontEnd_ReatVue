<!-- src/components/SearchBox.vue -->
<template>
  <div class="search-box">
    <input type="text" placeholder="Search items..." />
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
}
</script>

<style scoped>
.search-box {
  margin: 20px 0;
}

.search-box input {
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
