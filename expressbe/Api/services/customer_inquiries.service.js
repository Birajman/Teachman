const CustomerInquiryModel = require("../model/customer_inquiry.model");

class CustomerInquiryService {
  validateData = (data) => {
    let error = {};
    if (!data.name) {
      error.name = "Name is required";
    }
    if (!data.email) {
      error.email = "Email is required";
    }
    if (!data.message) {
      error.message = "Message is required";
    }

    if (Object.keys(error).length) {
      throw {
        status: 400,
        msg: error,
      };
    }
    return null;
  };

  customer_inquiries = async (data) => {
    let user_Data = new CustomerInquiryModel(data);
    return await user_Data.save();
  };
  fetchAllDateInquiry = async () => {
    return await CustomerInquiryModel.find();
  }; 
}

module.exports = CustomerInquiryService;
