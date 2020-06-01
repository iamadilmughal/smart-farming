var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DiseasesSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  diseaseID: Number,
  diseaseName: { type: String, required: true },
  description: String,
  severity: String,
  symptoms: [String],
  diseaseImage: String,
  cures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cures" }],
  causedBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Pests", required: true },
  ],
});
module.exports = mongoose.model("Diseases", DiseasesSchema);
