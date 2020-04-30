<template>
    <div class="review">
        <success v-if="success">Your feedback is so valuable to us</success>
        <fatal-error v-if="error"></fatal-error>
        <div v-if="!success && !error">
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
                                    v-model="review.content"
                                    cols="30"
                                    rows="10"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': errorFor('content')
                                    }"
                                ></textarea>
                                <v-errors
                                    :errors="errorFor('content')"
                                ></v-errors>
                            </div>
                            <button
                                type="submit"
                                class="btn btn-dark btn-block"
                                :disabled="sending"
                                @click="submit"
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
import { is404, is422 } from "../shared/utils/response";
import validationErrors from "../shared/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    data() {
        return {
            review: {
                id: null,
                rating: 1,
                content: null
            },
            existingReview: null,
            loading: false,
            sending: false,
            booking: null,
            error: false,
            success: false
        };
    },
    created() {
        this.loading = true;
        this.review.id = this.$route.params.id;

        axios
            .get(`/api/reviews/${this.review.id}`)
            .then(res => {
                this.existingReview = res.data.data;
            })
            .catch(err => {
                if (is404(err)) {
                    return axios
                        .get(`/api/booking-by-review/${this.review.id}`)
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
    },
    methods: {
        submit() {
            this.sending = true;
            this.errors = null;
            this.success = false;

            axios
                .post("/api/reviews", this.review)
                .then(res => {
                    this.success = res.status === 201;
                })
                .catch(err => {
                    if (is422(err)) {
                        const errors = err.response.data.errors;
                        if (errors["content"] && _.size(errors) === 1) {
                            this.errors = errors;
                            return;
                        }

                        this.error = true;
                    }
                })
                .then(() => (this.sending = false));
        }
    }
};
</script>

<style scoped></style>
