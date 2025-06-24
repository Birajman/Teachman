const AssessmentService = require("../services/assessment.service");
class AssessmentController {
  constructor() {
    this.assessment_srv = new AssessmentService();
  }
  createAssessment = async (req, res, next) => {
    try {
      let data = req.body;
      if (!data.optionID) {
        data.optionID = Date.now().toString();
      }
      if (!data.mcqs || !Array.isArray(data.mcqs) || data.mcqs.length === 0) {
        return res.status(400).json({
          status: false,
          msg: "At least one MCQ is required",
        });
      }
      data.publish_by = req.auth_user.firstName+" "+ req.auth_user.lastName

      let result = await this.assessment_srv.storeAssessment(data);
      console.log("Result", result);

      res.json({
        result: result,
        msg: "Your MCQ's has been created",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  getFetchData = async (req, res, next) => {
    try {
      let result = await this.assessment_srv.fetchAllData();
      res.json({
        result: result,
        msg: "Fetched All Data",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  getFetchDataByID = async (req, res, next) => {
    try {
      let result = await this.assessment_srv.fetchDataByIDService(
        req.params.id
      );
      res.json({
        result: result,
        msg: "Assessment Data by ID",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  updateAssessment = async (req, res, next) => {
    try {
      let data = req.body;
      if (!data.mcqs || !Array.isArray(data.mcqs) || data.mcqs.length === 0) {
        return res.status(400).json({
          status: false,
          msg: "At least one MCQ is required",
        });
      }
      console.log("data: ", data)

      let store = await this.assessment_srv.UpdateAssessmentByID(data, req.params.id);
      console.log("store", store);
      res.json({
        result: store,
        msg: "Your Assessment has been Updated Successfully",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
module.exports = AssessmentController;
