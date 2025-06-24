const router = require('express').Router()
const auth_router = require('./auth_route')
const customerInquiry = require('./customer.inqury')
const UserRoute = require('./user.route')
const ArticleRoute = require('./article.route')
const AssessmentRoute = require('./assessment.route')
const CustomizeArtRoute = require('./customize_art.route')



router.use("/", auth_router)
router.use("/user", UserRoute)
router.use("/customer-inquiry", customerInquiry)
router.use("/article", ArticleRoute)
router.use("/fun-of-assessment", AssessmentRoute)
router.use("/customize-art", CustomizeArtRoute)

module.exports = router