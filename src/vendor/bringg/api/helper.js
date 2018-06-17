const credentials = require('../../../../config/credentials');
const request = require('request-promise-native');
const crypto = require('crypto');
const querystring = require('querystring');

module.exports = {
    /**
     * Add general params and make request to Bringg API
     * @param {Object} options
     * @return {Promise}
     */
    execute(options) {
        options.url = credentials.bringg.url + options.url;

        options.body.timestamp = Date.now();
        options.body.company_id = credentials.bringg.companyId;
        options.body.access_token = credentials.bringg.accessToken;

        const signature = crypto.createHmac('sha1', credentials.bringg.secretKey)
                                .update(querystring.stringify(options.body))
                                .digest('hex');

        options.body.signature = signature;

        return request(options)
            .then((response) => {
                return response;
            });
    },
};
