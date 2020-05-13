<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <h3>Checkout Form</h3>
            </div>
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
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items
        })
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
