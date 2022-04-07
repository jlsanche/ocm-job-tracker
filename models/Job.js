import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    
    status: {
      type: String,
      enum: ["staged", "wip", "completed", "on_hold"],
      default: "staged",
    },
    jobType: {
      type: String,
      enum: ["Oil", "Engine", "Electrical", "Drive_train", "Brakes", "Suspension", "Custom"],
      default: "Select a job type",
      required: [true, 'Please provide job type!'],
    },
  
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide employee creating this job"],
    },

    notes: {
      type: String,
      default: "Enter any notes here...",
    },

    client: {

      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: [true, 'Please provide client requesting this job']
    }
  },

  { timestamps: true }
);


export default mongoose.model('Job', JobSchema)