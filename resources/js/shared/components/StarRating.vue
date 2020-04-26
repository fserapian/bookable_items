<template>
    <div class="d-flex">
        <i
            class="fas fa-star"
            v-for="star in fullStar"
            :key="'full' + star"
        ></i>
        <i class="far fa-star"></i>
        <i class="fas fa-star-half-alt" v-if="halfStar"></i>
    </div>
</template>

<script>
export default {
    computed: {
        fullStar() {
            return 4;
        },
        emptyStar() {
            return 1;
        },
        halfStar() {
            return false;
        }
    }
};
</script>

<style scoped></style>
