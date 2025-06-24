const AssessmentModel = require("../model/assessment.model");

class AssessmentService {
  storeAssessment = async (data) => {
    let response = new AssessmentModel(data);
    return await response.save();
  };
  fetchAllData = async () => {
    return await AssessmentModel.find();
  };
  fetchDataByIDService = async (id) => {
    try {
      return await AssessmentModel.findById(id);
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
  UpdateAssessmentByID = async (data, id) => {
    try {
      let response = await AssessmentModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return response;
    } catch (err) {
      throw{
        msg: err,
        status: 404
      }
    }
  };
}
module.exports = AssessmentService;
