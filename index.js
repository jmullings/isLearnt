/**
 * Created by jlmconsulting on 13/09/2017.
 */
const baseData = require('./src/baseData');
require('dotenv').config();

module.exports = function (b, c, d) {
    if (global.MONGO_URL = process.env.MONGO_URL || b, 'string' != typeof b || null == b)throw new Error('Mongod url required!!');
    baseData(c, e=> {
        d(e)
    })
};