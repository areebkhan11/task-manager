import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  checklist: string[];
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  checklist: { type: [String], required: true },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITask>("Task", taskSchema);
