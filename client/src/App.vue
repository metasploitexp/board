<template>
  <div>
<<<<<<< HEAD
    <navbar />
    <div class="container">
      <router-view />
    </div>
    
=======
    <div>
      <navbar />
    </div>
    <router-view />
>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
  </div>
</template>

<script>
<<<<<<< HEAD
import navbar from './components/navbar.vue'
export default {
  components: {
    navbar
  }
=======

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
>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
}
</script>

<style>
<<<<<<< HEAD
* {
  margin: 0;
  padding: 0;
=======
@import "~materialize-css/dist/css/materialize.min.css";
body {
  background-color: rgb(173, 173, 173);
>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
}
</style>
