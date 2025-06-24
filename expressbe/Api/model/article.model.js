const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    author_name: String,
    biography: String,
    country: {
      label: { type: String },
      value: { type: String },
    },
    description: String,
    heading: String,
    image: String,
    status: {
      type: String,
      default: "draft",
    },
    sub_heading: String,
    slug: String,
    article_order: String,
    time: {
      type: Date,
      default: Date.now,
    },
    publish_by: {
      type: String,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const AritcleModel = mongoose.model("article", ArticleSchema);
module.exports = AritcleModel;
