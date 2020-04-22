<template>
    <div class="card mb-4 shadow-sm w-100">
        <div class="card-header d-flex justify-content-between">
            <span>{{ title }}</span>
            <router-link :to="{ name: 'bookable', params: { id } }">
                <button class="btn btn-primary btn-sm">
                    Read more
                </button>
            </router-link>
        </div>
        <div class="card-body">
            <p class="card-text">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        title: String,
        description: String
    },
    mounted() {
        console.log(this.title);
    }
};
</script>

<style scoped></style>
