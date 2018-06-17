const { execute } = require('./helper');

/**
 * Create new task in Bringg
 * @param {Object} taskDetails
 * @return {Promise}
 */
function create(taskDetails) {
    return execute({
        method: 'post',
        url: '/tasks',
        body: taskDetails,
        json: true, // Automatically stringifies the body to JSON
    });
}

/**
 * Return all tasks in page from Bringg
 * @param {number} page
 * @return {Promise}
 */
function getTasks(page = 0) {
    return execute({
        methods: 'get',
        url: '/tasks',
        body: { page },
        json: true, // Automatically stringifies the body to JSON
    });
};

module.exports = {
    create,
    getTasks,
};
