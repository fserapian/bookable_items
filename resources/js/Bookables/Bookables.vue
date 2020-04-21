<template>
    <div>
        <div class="home-header px-3 pb-md-4 mx-auto">
            <h1 class="display-4">List of bookables</h1>
            <p class="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                autem?
            </p>
        </div>
        <div v-if="loading">
            <h1>Data is loading...</h1>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-md-4" v-for="(b, i) in bookables" :key="i">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-header">
                            {{ b.title }}
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                {{ b.content }}
                            </p>
                            <div
                                class="d-flex justify-content-between align-items-center"
                            >
                                <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-secondary"
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-secondary"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <small class="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
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
            bookables: null,
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
        setTimeout(() => {
            this.bookables = [
                {
                    title: "Bookable One",
                    content: "This is bookable one"
                },
                {
                    title: "Bookable Two",
                    content: "This is bookable two"
                },
                {
                    title: "Bookable Three",
                    content: "This is bookable three"
                },
                {
                    title: "Bookable Four",
                    content: "This is bookable four"
                },
                {
                    title: "Bookable Five",
                    content: "This is bookable five"
                }
            ];
            this.loading = false;
        }, 500);
    }
};
</script>

<style scoped></style>
