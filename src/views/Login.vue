<template>
    <v-container>

        <v-form>
            <v-text-field v-model="credential.email" prepend-icon="mdi-email" name="email" label="email"></v-text-field>
            <v-text-field v-model="credential.password" prepend-icon="mdi-lock" name="Password" label="Password"
                          type="password"></v-text-field>
            <v-card-actions>
                <v-btn primary large block @click="login">Login</v-btn>
            </v-card-actions>
        </v-form>

    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                credential: {
                    email: "",
                    password: "",
                }
            }
        },

        methods: {
            login() {
                this.$axios.post('http://localhost:8000/api/users/auth/login/', this.credential).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        }

    }
</script>

<style scoped>

</style>