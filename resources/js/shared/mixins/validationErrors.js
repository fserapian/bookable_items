export default {
    data() {
        return {
            errors: null
        };
    },
    methods: {
        errorFor(field) {
            return this.errors && this.errors[field] !== null
                ? this.errors[field]
                : null;
        }
    }
};
