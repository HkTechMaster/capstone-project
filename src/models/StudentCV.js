import mongoose from "mongoose";

const StudentCVSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      unique: true,
      required: true,
    },

    cvData: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "VERIFIED"],
      default: "DRAFT",
    },

    verifiedOnce: {
      type: Boolean,
      default: false,
    },

    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.models.StudentCV ||
  mongoose.model("StudentCV", StudentCVSchema);
