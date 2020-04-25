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
                    :bookableId="this.$route.params.id"
                ></availability>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <review-list :bookableId="this.$route.params.id"></review-list>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";

export default {
    components: {
        Availability,
        ReviewList
    },
    data() {
        return {
            bookable: null
        };
    },
    created() {
        console.log(this.$route.params.id);
        axios
            .get(
                `http://bookable_items.test/api/bookables/${this.$route.params.id}`
            )
            .then(res => (this.bookable = res.data.data))
            .catch(err => console.log(err));
    }
};
</script>
