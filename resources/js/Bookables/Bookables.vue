<template>
    <div>
        <div v-if="loading">
            <h1>Data is loading...</h1>
        </div>
        <div v-else>
            <div class="home-header px-3 pb-md-4 mx-auto">
                <h1 class="display-4">List of bookables</h1>
                <p class="lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus, autem?
                </p>
            </div>
            <div class="row">
                <div
                    class="col-md-4 d-flex align-items-stretch"
                    v-for="b in bookables"
                    :key="b.id"
                >
                    <bookable-list-item
                        :id="b.id"
                        :title="b.title"
                        :description="b.description"
                    ></bookable-list-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem";

export default {
    components: {
        BookableListItem
    },
    data() {
        return {
            bookables: [],
            loading: false
        };
    },
    computed: {
        rows() {
            return this.bookables !== null ? this.bookables.length : 0;
        }
    },
    created() {
        this.loading = true;

        const url = "http://bookable_items.test/api/bookables";
        axios.get(url).then(res => {
            this.loading = false;
            this.bookables = res.data.data;
        });
    }
};
</script>

<style scoped></style>
