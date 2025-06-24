const router = require('express').Router()
const CustomerInquiry = require('../Api/controller/customer.inquiry')
const customer_inquiry_ctrl = new CustomerInquiry()

router.route("/")
    .post(customer_inquiry_ctrl.createInquiry)
    .get(customer_inquiry_ctrl.fetAllInquiry)


module.exports = router