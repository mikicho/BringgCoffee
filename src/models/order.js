const bringg = require('../vendor/bringg');

/**
 * Filter bringg orders objects by phone
 * @param {Array} bringgOrders
 * @param {string} phone
 * @return {Array}
 */
function filterByPhone(bringgOrders, phone) {
    return bringgOrders.filter((task) => {
        return task.customer.phone == phone;
    });
}

module.exports = {
    /**
     * Create a new Customer and Order in Bringg systems
     * @param {Object} orderDetails
     * @return {Promise}
     */
    create(orderDetails) {
        const bringgCustomerDetails = {
            name: orderDetails.name,
            phone: orderDetails.phone,
            address: orderDetails.address,
        };

        return bringg.customers.create(bringgCustomerDetails).then((bringgCustomer) => {
            const bringgOrderDetails = Object.assign({ customer_id: bringgCustomer.id }, orderDetails.order_details);

            return bringg.tasks.create(bringgOrderDetails).then((bringgOrder) => {
                return {
                    id: bringgOrder.task.external_id,
                    title: bringgOrder.task.title,
                    address: bringgOrder.task.address,
                    customer: {
                        name: bringgOrder.task.customer.name,
                        phone: bringgOrder.task.customer.phone,
                    },
                };
            });
        });
    },
    /**
     * Recreate all orders of spcific customer from timestamp
     * @param {string} phone
     * @param {number} fromTimestamp
     * @return {Promise}
     */
    redoOrders(phone, fromTimestamp) {
        return this.getOrdersFromTimestamp([], fromTimestamp, 1)
            .then((orders) => {
                return filterByPhone(orders, phone);
            })
            .then((orders) => {
                const promises = [];

                orders.forEach((order) => {
                    promises.push(bringg.tasks.create({
                        customer_id: order.customer.id,
                        name: order.customer.name,
                        phone: order.customer.phone,
                        address: order.address,
                    }));
                });

                return Promise.all(promises)
                    .then((results) => {
                        return results;
                    });
            });
    },
    /**
     * Fetch all orders from timestamp
     * @param {Array} orders
     * @param {mumber} fromTimestamp
     * @param {mumber} page
     * @return {Promise}
     */
    getOrdersFromTimestamp(orders, fromTimestamp, page) {
        return this.getOrders(page)
            .then((pageOrders) => {
                const lastOrder = pageOrders[pageOrders.length - 1];
                if (lastOrder) {
                    if (Date.parse(lastOrder.created_at) > fromTimestamp) {
                        return this.getOrdersFromTimestamp(orders.concat(pageOrders), fromTimestamp, page + 1);
                    } else {
                        const filteredPageOrders = pageOrders.filter((order) => {
                            return Date.parse(order.created_at) > fromTimestamp;
                        });
                        return orders.concat(filteredPageOrders);
                    }
                }

                return orders;
            });
    },
    /**
     * Fetch page of orders
     * @param {number} page
     * @return {Promise}
     */
    getOrders(page) {
        return bringg.tasks.getTasks(page);
    },
};
