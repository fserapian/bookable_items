<template>
    <div class="text-center error">
        <i class="fas fa-check-circle"></i>
        <h1>Success</h1>
        <h2>
            <slot></slot>
        </h2>
    </div>
</template>

<style scoped>
.error {
    font-size: 10rem;
    color: #999;
}
</style>
