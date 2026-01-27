import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    rollNo: { type: String, required: true },

    course: { type: String, required: true },

    department: { type: String, required: true },

    officialEmail: {
      type: String,
      required: true,
      unique: true,
    },

    photo: { type: String }, // abhi URL / later upload

    status: {
      type: String,
      enum: ["REGISTERED", "IDENTITY_APPROVED", "ACTIVE"],
      default: "REGISTERED",
    },

    rejectionRemark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);