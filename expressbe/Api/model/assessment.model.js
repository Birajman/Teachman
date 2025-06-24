const mongoose = require("mongoose");

const MCQSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 2;
      },
      message: "Options must have at least 2 items.",
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 0 && v < this.options.length;
      },
      message: "Correct answer index is invalid.",
    },
  },
});

const AssessmentSchema = mongoose.Schema(
  {
    optionID: {
      type: String,
      required: true,
    },
    mcqs: {
      type: [MCQSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1;
        },
        message: "At least one MCQ is required.",
      },
    },
    time: {
      type: Date,
      default: Date.now,
    },
    publish_by: {
      type: String
    }
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const AssessmentModel = mongoose.model("Assessment", AssessmentSchema);
module.exports = AssessmentModel;
