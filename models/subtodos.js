import mongoose from "mongoose";


const SubToDoSchema = new mongoose.Schema({
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
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
    }
  });
  
  export const SubToDo = mongoose.model('SubToDo', SubToDoSchema);

  