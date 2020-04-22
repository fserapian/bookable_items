<template>
    <div class="card" v-if="bookable">
        <div class="card-body">
            <h2 class="card-title">{{ bookable.title }}</h2>
            <hr />
            <div class="card-text">{{ bookable.description }}</div>
        </div>
    </div>
</template>

<script>
export default {
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
