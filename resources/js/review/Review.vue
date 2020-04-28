<template>
    <div>
        <div v-if="loading">
            <h2>Loading...</h2>
        </div>
        <div v-else>
            <div v-if="bookingExists">
                You have already reviewed this booking!
            </div>
            <div v-else>
                <div class="form-group">
                    <label class="text-muted"
                        >Rate the review (1 is worst - 5 is best)</label
                    >
                    <star-rating
                        v-model="review.rating"
                        class="fa-3x"
                    ></star-rating>
                </div>
                <div class="form-group">
                    <label class="text-muted" for="content"
                        >Leave a review</label
                    >
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        class="form-control"
                    ></textarea>
                </div>
                <button type="submit" class="btn btn-dark btn-block">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            review: {
                rating: null,
                content: null
            },
            bookingExists: null,
            loading: false
        };
    },
    created() {
        this.loading = true;
        axios
            .get(
                `http://bookable_items.test/api/reviews/${this.$route.params.id}`
            )
            .then(res => (this.bookingExists = res.data.data))
            .catch(err => {
                // error
            })
            .then(() => (this.loading = false));
    }
};
</script>

<style scoped></style>
