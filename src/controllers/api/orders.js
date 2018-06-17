const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const orderModel = require('../../models/order');

router.post('/', [
        check('name').exists(),
        check('address').exists(),
        check('order_details').exists(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        orderModel.create(req.body)
        .then((orderDetails) => {
            return res.json(orderDetails);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(500).send('Oops!');
        });
    }
);

router.post('/reorder-previous-week/:phone', [
        check('phone').isMobilePhone('he-IL'),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const sevenDaysAgoTimestamp = Date.now() - (7 * 24 * 60 * 60 * 1000);
        orderModel.redoOrders(req.params.phone, sevenDaysAgoTimestamp)
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(500).send('Oops!');
        });
    }
);

module.exports = router;
