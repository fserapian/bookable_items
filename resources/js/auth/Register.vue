<template>
    <div>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card card-body">
                    <div class="container">
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    class="form-control"
                                    :class="{ 'is-invalid': errorFor('name') }"
                                    v-model="user.name"
                                    placeholder="Enter your full name"
                                />
                                <v-errors :errors="errorFor('name')"></v-errors>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    class="form-control"
                                    :class="{ 'is-invalid': errorFor('email') }"
                                    v-model="user.email"
                                    placeholder="Enter your email"
                                />
                                <v-errors
                                    :errors="errorFor('email')"
                                ></v-errors>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': errorFor('password')
                                    }"
                                    v-model="user.password"
                                    placeholder="Enter your password"
                                />
                                <v-errors
                                    :errors="errorFor('password')"
                                ></v-errors>
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation"
                                    >Confirm Password</label
                                >
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': errorFor(
                                            'password_confirmation'
                                        )
                                    }"
                                    v-model="user.password_confirmation"
                                    placeholder="Retype your password"
                                />
                                <v-errors
                                    :errors="errorFor('password_confirmation')"
                                ></v-errors>
                            </div>
                            <input
                                type="submit"
                                name="login"
                                value="Sign Up"
                                class="btn btn-outline-dark btn-block mt-4"
                            />
                            <div class="my-3">
                                Already have an account?
                                <router-link :to="{ name: 'login' }"
                                    >Login</router-link
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
import { logIn } from "../shared/utils/auth";

export default {
    mixins: [validationErrors],
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            },
            loading: false
        };
    },
    methods: {
        async register() {
            this.loading = true;
            this.errors = null;

            try {
                const response = await axios.post("/register", this.user);

                if (response.status === 201) {
                    logIn();
                }

                this.$store.dispatch("loadUser");
                this.$router.push({ name: "home" });
            } catch (err) {
                this.errors = err.response ? err.response.data.errors : null;
            }

            this.loading = false;
        }
    }
};
</script>
