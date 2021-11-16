<template>
    <nav>
    <div class="nav-wrapper orange darken-4">
      <router-link class="brand-logo" :to='{name: "all"}'> Board </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to='{name: "all"}'> Объявления </router-link></li>
        <li><router-link :to='{name: "ads"}'> Создать </router-link></li>
        <li><router-link :to="{name: 'user', params: {user}}">Мои объявления</router-link></li>
        <li><router-link :to='{name: "auth"}' @click="logOut">{{login}} </router-link> </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    export default {
        data() {
            return {
                user: this.$store.state.User.id,
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('User/logOut')
            }
        },
        computed: {
            login: function () {
                console.log('obj:', this.$store.state.User)
                return this.$store.state.User.isAuthenticated ? 'Выход' : 'Вход'
            }
        }
    }
</script>

<style scoped>

</style>