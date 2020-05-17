<template>
    <div>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card card-body">
                    <div class="container">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    class="form-control"
                                    :class="{ 'is-invalid': errorFor('email') }"
                                    v-model="email"
                                />
                                <v-errors
                                    :errors="errorFor('email')"
                                ></v-errors>
                            </div>

                            <div class="form-group">
                                <label for="email">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': errorFor('password')
                                    }"
                                    v-model="password"
                                />
                                <v-errors
                                    :errors="errorFor('password')"
                                ></v-errors>
                            </div>
                            <input
                                type="submit"
                                name="login"
                                value="Login"
                                class="btn btn-outline-dark btn-block mt-4"
                                :disabled="loading"
                            />
                            <div class="my-3">
                                Don't have an account?
                                <router-link :to="{ name: 'home' }"
                                    >Register</router-link
                                >
                            </div>
                            <div class="mt-3">
                                Forgot your password?
                                <router-link :to="{ name: 'home' }"
                                    >Reset password</router-link
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import validationErrors from "../shared/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    data() {
        return {
            email: null,
            password: null,
            loading: false,
            errors: null
        };
    },
    methods: {
        async login() {
            this.loading = true;
            this.errors = null;

            try {
                await axios.get("/sanctum/csrf-cookie");

                await axios.post("/login", {
                    email: this.email,
                    password: this.password
                });

                await axios.get("/user");
            } catch (err) {
                this.errors =
                    err.response && err.response.data.errros
                        ? err.response.data.errors
                        : null;
            }

            this.loading = false;
        }
    }
};
</script>
