<template>
    <div class="reviews d-none d-md-block">
        <h2 class="mb-3">Reviews</h2>
        <div class="border-bottom mb-3" v-for="i in 4" :key="i">
            <div class="row">
                <div class="col-md-6">
                    <h5>Name</h5>
                    <p class="text-muted">Date and time</p>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                    <span>Rating</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p>This is the conent of the review</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.reviews {
    margin-left: 1.25rem;
}
</style>
