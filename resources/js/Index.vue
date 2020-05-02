<template>
    <div>
        <div
            class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
        >
            <h5 class="my-0 mr-md-auto font-weight-normal">
                <router-link :to="{ name: 'home' }" class="co-logo"
                    >{Bookable_Items}</router-link
                >
            </h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <router-link :to="{ name: 'home' }">Second</router-link>
            </nav>
        </div>

        <div class="container mt-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            lastSearch: this.$store.state.lastSearch,
        };
    },
    computed: {
        ...mapState({
            lastSearchComputed: state => state.lastSearch
        }),
        simpleCalculation() {
            return 5 + 10;
        }
    }
};
</script>

<style scoped>
.co-logo {
    color: #000;
    text-decoration: none;
}
</style>
