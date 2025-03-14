import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  subToDos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubToDo'
    }
  ]
});

export const Project = mongoose.model('Project', ProjectSchema);

