const customer = require("./customer")
const driver = require("./driver")
const admin = require("./admin")
const all = [].concat(customer,driver,admin);

module.exports = all;
