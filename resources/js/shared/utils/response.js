export const is404 = function(err) {
    return isResponseAndResponseStatusTrue && err.response.status === 404;
};

export const is422 = function(err) {
    return isResponseAndResponseStatusTrue && err.response.status === 422;
};

export const isResponseAndResponseStatusTrue = function() {
    return err.response && err.response.status;
};
