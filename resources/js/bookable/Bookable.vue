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

                <transition name="fade">
                    <price-breakdown
                        v-if="price"
                        :price="price"
                    ></price-breakdown>
                </transition>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <review-list :bookable-id="this.$route.params.id"></review-list>
            </div>
            <div class="col-md-4"></div>
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
    computed: mapState({
        lastSearch: "lastSearch"
    }),
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
        }
    }
};
</script>
