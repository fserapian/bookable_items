<template>
    <div>
        <div class="form-group">
            <label class="text-muted"
                >Rate the review (1 is worst - 5 is best)</label
            >
            <star-rating :rating="5" class="fa-3x"></star-rating>
        </div>
        <div class="form-group">
            <label class="text-muted" for="review">Leave a review</label>
            <textarea
                name="review"
                id="review"
                cols="30"
                rows="10"
                class="form-control"
            ></textarea>
        </div>
        <button type="submit" class="btn btn-dark btn-block">Submit</button>
    </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
