<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">
                    {{ title }}
                </h3>
                <p class="card-text">
                    {{ content }}
                </p>
                <p>Price: {{ price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        content: String,
        price: Number
    },
    mounted() {
        console.log(this.title);
    }
};
</script>

<style scoped></style>
