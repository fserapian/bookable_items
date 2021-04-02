<template>
    <div>
        <div
            class="invalid-feedback"
            v-for="(error, i) in errors"
            :key="key(i)"
        >
            {{ error }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["errors"],
    methods: {
        key(i) {
            return `validation_error_${i}_${Math.random()}`;
        }
    }
};
</script>

<style scoped>
.is-invalid ~ div > .invalid-feedback {
    display: block;
}
</style>
