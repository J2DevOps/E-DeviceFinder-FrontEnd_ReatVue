<template>
  <div class="search-box">
    <input
      v-model="searchTerm"
      @input="onSearch"
      type="text"
      placeholder="Search items..."
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  emits: ['search'],
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchTerm)
    }
  }
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
