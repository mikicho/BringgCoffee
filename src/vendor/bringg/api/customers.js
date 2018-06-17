const { execute } = require('./helper');

/**
 * Create new customer in Bringg
 * @param {Object} customerDetails
 * @return {Promise}
 */
function create(customerDetails) {
    return execute({
            method: 'post',
            url: '/customers',
            body: customerDetails,
            json: true, // Automatically stringifies the body to JSON
        })
        .then((response) => {
            return response.customer;
        });
}

module.exports = {
    create,
};
