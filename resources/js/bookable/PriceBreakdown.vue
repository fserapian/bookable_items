<template>
    <div>
        <h4>Price Breakdown</h4>
        <div
            v-for="(days, p) in price.breakdown"
            :key="days + p"
            class="border-bottom mb-2 d-flex justify-content-between"
        >
            <div>{{ days }} x ${{ p }}</div>
            <div>${{ price.total_price }}</div>
        </div>
        <div class="mb-2 d-flex justify-content-between mb-3">
            <div>Total Price</div>
            <div>${{ price.total_price }}</div>
        </div>
        <button class="btn btn-outline-dark btn-block">Checkout</button>
    </div>
</template>

<script>
export default {
    props: {
        price: Object
    }
};
</script>
