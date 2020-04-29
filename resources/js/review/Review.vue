<template>
    <div class="review">
        <div class="row" v-if="error">
            <div class="col-md-12">
                <h3>Something went wrong, please try again later</h3>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div
                    :class="[
                        { 'col-md-4': twoColumns },
                        { 'd-none': oneColumn }
                    ]"
                >
                    <div v-if="loading">Loading...</div>
                    <div v-if="hasBooking">
                        <div class="card">
                            <div class="card-body">
                                <p>
                                    You have stayed at
                                    <router-link
                                        :to="{
                                            name: 'bookable',
                                            params: {
                                                id: booking.bookable.bookable_id
                                            }
                                        }"
                                        >{{
                                            booking.bookable.title
                                        }}</router-link
                                    >
                                </p>
                                <p>
                                    From {{ booking.from }} to {{ booking.to }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    :class="[
                        { 'col-md-8': twoColumns },
                        { 'col-md-12': oneColumn }
                    ]"
                >
                    <div v-if="loading">
                        <h2>Loading...</h2>
                    </div>
                    <div v-else>
                        <div v-if="isBookingReviewed">
                            <h2>
                                You have already reviewed this booking!
                            </h2>
                        </div>
                        <div v-else>
                            <div class="form-group">
                                <label class="text-muted"
                                    >Rate the review (1 is worst - 5 is
                                    best)</label
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
                            <button
                                type="submit"
                                class="btn btn-dark btn-block"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404 } from "../shared/utils/response";

export default {
    data() {
        return {
            review: {
                rating: null,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false
        };
    },
    created() {
        this.loading = true;
        axios
            .get(`/api/reviews/${this.$route.params.id}`)
            .then(res => {
                this.existingReview = res.data.data;
            })
            .catch(err => {
                if (is404(err)) {
                    return axios
                        .get(`/api/booking-by-review/${this.$route.params.id}`)
                        .then(res => {
                            this.booking = res.data.data;
                        })
                        .catch(err => {
                            this.error = !is404(err);
                        });
                }

                this.error = true;
            })
            .then(() => {
                this.loading = false;
            });
    },
    computed: {
        isBookingReviewed() {
            return this.hasReview || !this.booking;
        },
        hasReview() {
            return this.existingReview !== null;
        },
        hasBooking() {
            return this.booking !== null;
        },
        oneColumn() {
            return !this.loading && this.isBookingReviewed;
        },
        twoColumns() {
            return this.loading || !this.isBookingReviewed;
        }
    }
};
</script>

<style scoped></style>
