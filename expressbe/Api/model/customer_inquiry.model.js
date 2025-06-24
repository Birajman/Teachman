const mongoose = require("mongoose");

const CustomerInquirySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: String,
    city: String,
    country: String,
    message: {
      type: String,
      required: true,
    },
    state: String,
    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const CustomerInquiryModel = mongoose.model("Inquiry", CustomerInquirySchema);
module.exports = CustomerInquiryModel;
