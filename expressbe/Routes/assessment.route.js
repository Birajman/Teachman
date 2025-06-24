const router = require('express').Router()
const AssessmentController = require('../Api/controller/assessment.controller')
const AuthCheck = require('../Api/middleware/auth_middleware')
const assessment_ctrl = new AssessmentController()

router.route("/")
    .post(AuthCheck, assessment_ctrl.createAssessment)
    .get(assessment_ctrl.getFetchData)

router.route("/:id")
    .get(assessment_ctrl.getFetchDataByID)
    .put(assessment_ctrl.updateAssessment)
    // .delete(article_ctrl.deleteArticle)


module.exports = router