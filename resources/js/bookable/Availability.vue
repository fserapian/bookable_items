<template>
    <div>
        <h5>
            <span>Check Availability</span>
            <span v-if="noAvailability" class="text-danger text-uppercase"
                >(not available)</span
            >
            <span v-if="hasAvailability" class="text-success text-uppercase"
                >(available)</span
            >
        </h5>

        <form class="form-row">
            <div class="form-group col-md-6">
                <label for="from" class="text-muted">From</label>
                <input
                    id="from"
                    name="from"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': errorFor('from') }"
                    placeholder="Start date"
                    v-model="from"
                />
                <div
                    class="invalid-feedback"
                    v-for="(error, i) in this.errorFor('from')"
                    :key="'for' + i"
                >
                    {{ error }}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="to" class="text-muted">To</label>
                <input
                    id="to"
                    name="to"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': errorFor('to') }"
                    placeholder="End date"
                    v-model="to"
                />
                <div
                    class="invalid-feedback"
                    v-for="(error, i) in this.errorFor('to')"
                    :key="'to' + i"
                >
                    {{ error }}
                </div>
            </div>
            <button class="btn btn-dark btn-block" @click="check">Check</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        bookableId: String
    },
    data() {
        return {
            from: "",
            to: "",
            status: null,
            errors: null
        };
    },
    methods: {
        check(e) {
            e.preventDefault();
            axios
                .get(
                    `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
                )
                .then(res => (this.status = res.status))
                .catch(err => {
                    if (err.response.status === 422) {
                        this.errors = err.response.data.errors;
                    }
                    this.status = err.response.status;
                });
        },
        errorFor(field) {
            return this.hasErrors && this.errors[field] !== null
                ? this.errors[field]
                : null;
        }
    },
    computed: {
        hasErrors() {
            return this.errors && this.status === 422;
        },
        hasAvailability() {
            return this.status === 200;
        },
        noAvailability() {
            return this.status === 404;
        }
    }
};
</script>

<style scoped>
.is-invalid {
    background-image: none;
}
</style>
