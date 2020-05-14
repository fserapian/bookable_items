<template>
    <div>
        <div class="row">
            <di v class="col-md-8">
                <h3>Checkout Form</h3>
                <div class="form-row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                class="form-control"
                                v-model="customer.first_name"
                            />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                class="form-control"
                                v-model="customer.last_name"
                            />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    class="form-control"
                                    v-model="customer.email"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="street">Street</label>
                                <input
                                    type="text"
                                    name="street"
                                    id="street"
                                    class="form-control"
                                    v-model="customer.street"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="city">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    class="form-control"
                                    v-model="customer.city"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="country">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    class="form-control"
                                    v-model="customer.country"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="province">Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    id="province"
                                    class="form-control"
                                    v-model="customer.province"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="postalCode">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    class="form-control"
                                    v-model="customer.postal_code"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <button
                    type="submit"
                    class="btn btn-block btn-primary"
                    @click.prevent="book"
                >
                    Book Now
                </button>
            </di>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h4>Your Basket</h4>
                    <h4>
                        <span v-if="itemsInBasket" class="badge badge-secondary"
                            >{{ itemsInBasket }} Items</span
                        >
                        <span v-else class="badge badge-secondary">Empty</span>
                    </h4>
                </div>

                <transition-group name="fade">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div
                            class="border-top mt-2 pt-2 mb-2 d-flex justify-content-between"
                        >
                            <span class="font-weight-bold">
                                <router-link
                                    class="item-title"
                                    :to="{
                                        name: 'bookable',
                                        params: { id: item.bookable.id }
                                    }"
                                    >{{ item.bookable.title }}</router-link
                                >
                            </span>
                            <span class="font-weight-bold"
                                >${{ item.price.total_price }}</span
                            >
                        </div>
                        <div class="d-flex justify-content-between text-muted">
                            <span>From: {{ item.dates.from }}</span>
                            <span>To: {{ item.dates.to }}</span>
                        </div>
                        <div class="text-right remove">
                            <button
                                class="remove"
                                @click="
                                    $store.dispatch(
                                        'removeFromBasket',
                                        item.bookable.id
                                    )
                                "
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            loading: false,
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                province: null,
                postal_code: null
            }
        };
    },
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items
        })
    },
    methods: {
        book() {
            this.loading = true;
            axios
                .post("/api/checkout", {
                    customer: this.customer,
                    bookings: this.basket.map(item => {
                        return {
                            bookable_id: item.bookable.id,
                            from: item.dates.from,
                            to: item.dates.to
                        };
                    })
                })
                .then(() => (this.loading = false))
                .catch(err => console.log(err));
        }
    }
};
</script>

<style scoped>
.item-title {
    color: #000;
}

.remove {
    border: none;
    background-color: transparent;
    font-size: 0.7rem;
    color: dodgerblue;
}

.remove:hover {
    text-decoration: underline;
}
</style>
