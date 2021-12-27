<template>
  <div>
    <navbar />
    <div class="container">
      <router-view />
    </div>
    
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
export default {
  components: {
    navbar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
