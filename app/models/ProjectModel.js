const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  profile_image: { type: String },
  owner: { type: mongoose.Types.ObjectId, required: true },
  team: { type: String },
  private: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
});

const ProjectModel = mongoose.model("project", ProjectSchema);

module.exports = {
  ProjectModel,
};
