<template>
    <div>
        <h3>Check Availability</h3>
        <form class="form-row">
            <div class="form-group col-md-6">
                <label for="from" class="text-muted">From</label>
                <input
                    id="from"
                    name="from"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Start date"
                    v-model="startDate"
                />
            </div>
            <div class="form-group col-md-6">
                <label for="to" class="text-muted">To</label>
                <input
                    id="to"
                    name="to"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="End date"
                    v-model="endDate"
                />
            </div>
            <button class="btn btn-dark btn-block" @click="check">Check</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startDate: "",
            endDate: ""
        };
    },
    methods: {
        check() {
            alert("CHECK!");
        }
    }
};
</script>

<style scoped></style>
