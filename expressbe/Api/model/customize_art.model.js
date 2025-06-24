const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema({
  tool: { type: String, required: true },
  color: { type: String, required: true },
  strokeWidth: { type: Number, required: true },
  points: { type: [Number], required: true },
});

const ImagePropsSchema = new mongoose.Schema(
  {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  },
  { _id: false } // prevent creating _id for sub-schema
);

const CanvasSchema = new mongoose.Schema({
  name: String,
  backgroundColor: { type: String, default: "#ffffff" },
  orientation: {
    type: String,
    enum: ["landscape", "portrait"],
    default: "landscape",
  },
  uploadedImage: {
    type: String,
    default: null,
  },
  imageProps: { type: ImagePropsSchema, default: null },
  lines: { type: [LineSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  publish_by: { type: String, default: null },
  is_favorite: {
    type: Boolean,
    default: false,
  },
  isTrashed: {
    type: Boolean,
    default: false,
  },
  trashedAt: {
    type: Date,
    default: null,
  },
});

const CustomizeArtModel = mongoose.model("Canvas", CanvasSchema);
module.exports = CustomizeArtModel;
