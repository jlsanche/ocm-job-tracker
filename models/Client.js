import mongoose from "mongoose";
import validator from "validator";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 24,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },

    unique: true,
  },

  lastName: {
    type: String,
    trim: true,
    maxlength: 24,
    default: "lastName",
  },

  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    validate: {
      validator: validator.isMobilePhone,
      message: "Please provide a valid phone number",
    },

    unique: true,
  },

  notes: {
    type: String,
  },

  job: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
  ],
});

export default mongoose.model("Client", ClientSchema);
