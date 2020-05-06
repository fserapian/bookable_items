<template>
    <div>
        <div class="row">
            <div class="col-md-8 mb-3">
                <div class="card" v-if="bookable">
                    <div class="card-body">
                        <h2 class="card-title">{{ bookable.title }}</h2>
                        <hr />
                        <div class="card-text">{{ bookable.description }}</div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <availability
                    :bookable-id="this.$route.params.id"
                    @availability="checkPrice($event)"
                    class="mb-4"
                ></availability>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <review-list :bookable-id="this.$route.params.id"></review-list>
            </div>
            <div class="col-md-4">
                <transition name="fade">
                    <price-breakdown
                        :price="price"
                        v-if="price"
                    ></price-breakdown>
                </transition>

                <transition name="fade">
                    <button
                        class="btn btn-outline-dark btn-block mb-3"
                        @click="addToBasket"
                        :disabled="inBasketAlready"
                        v-if="price"
                    >
                        Book Now
                    </button>
                </transition>

                <transition name="fade">
                    <button
                        class="btn btn-outline-secondary btn-block mb-3"
                        v-if="inBasketAlready"
                        @click="removeFromBasket"
                    >
                        Remove From Basket
                    </button>
                </transition>

                <transition name="fade">
                    <small v-if="inBasketAlready"
                        >You added this item to the basket, if you want to
                        change dates, please remove it from the basket
                        first.</small
                    >
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./PriceBreakdown";
import { mapState } from "vuex";

export default {
    components: {
        Availability,
        ReviewList,
        PriceBreakdown
    },
    data() {
        return {
            bookable: null,
            price: null
        };
    },
    created() {
        axios
            .get(
                `http://bookable_items.test/api/bookables/${this.$route.params.id}`
            )
            .then(res => (this.bookable = res.data.data))
            .catch(err => console.log(err));
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch"
        }),
        inBasketAlready() {
            if (this.bookable === null) {
                return false;
            }
            return this.$store.getters.inBasketAlready(this.bookable.id);
        }
    },
    methods: {
        checkPrice(hasAvailability) {
            if (!hasAvailability) {
                this.price = null;
                return;
            }

            axios
                .get(
                    `/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
                )
                .then(res => {
                    this.price = res.data.data;
                })
                .catch(err => {
                    this.price = null;
                });
        },
        addToBasket() {
            this.$store.dispatch("addToBasket", {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            });
        },
        removeFromBasket() {
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        }
    }
};
</script>
