<template>
    <div class="reviews d-none d-md-block">
        <h2 class="mb-3">Reviews</h2>
        <div v-if="loading">Loading...</div>
        <div
            v-else
            class="border-bottom mb-3"
            v-for="(review, i) in reviews"
            :key="i"
        >
            <div class="row">
                <div class="col-md-6">
                    <h5>Fadi S.</h5>
                    <p class="text-muted">
                        {{ review.created_at | fromNow }}
                    </p>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <star-rating
                        :rating="review.rating"
                        class="fa-lg"
                    ></star-rating>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p>{{ review.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookableId: String
    },
    data() {
        return {
            loading: false,
            reviews: []
        };
    },
    created() {
        this.loading = true;
        axios
            .get(
                `http://bookable_items.test/api/bookables/${this.bookableId}/reviews`
            )
            .then(res => (this.reviews = res.data.data))
            .catch(err => console.log(err))
            .then(() => (this.loading = false));
    }
};
</script>

<style scoped>
.reviews {
    margin-left: 1.25rem;
}
</style>
