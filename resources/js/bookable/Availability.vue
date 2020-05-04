<template>
    <div>
        <h5>
            <h4 class="availability-title">Check Availability</h4>
            <transition name="fade">
                <span v-if="noAvailability" class="text-danger text-uppercase"
                    >(not available)</span
                >
                <span v-if="hasAvailability" class="text-success text-uppercase"
                    >(available)</span
                >
            </transition>
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
                <v-errors :errors="errorFor('from')"></v-errors>
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
                <v-errors :errors="errorFor('to')"></v-errors>
            </div>
            <button
                class="btn btn-dark btn-block"
                @click.prevent="check"
                :disabled="loading"
            >
                <span v-if="!loading">Check</span>
                <span v-if="loading">
                    <i class="fas fa-sync fa-spin"></i>&nbsp;&nbsp;Checking
                </span>
            </button>
        </form>
    </div>
</template>

<script>
import { is422 } from "../shared/utils/response";
import validationErrors from "../shared/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    props: {
        bookableId: [String, Number]
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            status: null,
            loading: false
        };
    },
    methods: {
        async check() {
            this.loading = true;

            this.$store.commit("setLastSearch", {
                from: this.from,
                to: this.to
            });

            try {
                this.status = (
                    await axios.get(
                        `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
                    )
                ).status;
                this.$emit("availability", this.hasAvailability);
            } catch (err) {
                if (is422(err)) {
                    this.errors = err.response.data.errors;
                }
                this.status = err.response.status;
                this.$emit("availability", this.hasAvailability);
            }

            this.loading = false;
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

.availability-title {
    display: inline;
}
</style>
