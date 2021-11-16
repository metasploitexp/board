<template>
  <div>
    <div>
      <navbar />
    </div>
    <router-view />
  </div>
</template>

<script>

import navbar from './components/navbar.vue'

export default {
  components: {
    navbar
  },
  data () { 
    return {
      isAuthenticated: false
    }
  },
}
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
body {
  background-color: rgb(173, 173, 173);
}
</style>
