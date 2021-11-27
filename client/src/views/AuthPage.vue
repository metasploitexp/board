<template>
    <form>
        <div class="row">
            <div class="col s12 m6">
                <div class="card orange darken-4">
                    <div class="card-content white-text">
                        <span class="card-title">Аутентификация и регистрация</span>
                        <input :placeholder="emailHolder" v-model="email" />
                        <input :placeholder="loginHolder" v-model="login" />
                        <input :placeholder="passwordHolder" v-model="password" type="password" />
                    </div>
                    <div class="card-action">
                        <button class="btn" @click.prevent="signIn" >Войти</button> &nbsp;
                        <button class="btn" @click.prevent="signUp">Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            emailHolder: 'Введите email',
            loginHolder: 'Введите логин',
            passwordHolder: 'Введите пароль',
            email: '',
            login: '',
            password: '',
        }
    },
    methods: {
        signUp() {
            this.$store.dispatch('User/register',{
                email: this.email,
                login: this.login,
                password: this.password})
        },
        signIn() {
            this.$store.dispatch('User/logIn',{
                login: this.login,
                password: this.password})
        }
    }
}
</script>

<style scoped>

form {
    width: 75%;
    margin-left: 30%;
    margin-top: 5%;
}
input {
    color: black!important;
}

</style>