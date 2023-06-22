import { ITask } from "../interfaces/model/tasks";
import mongoose from "../providers/database";

export interface ITaskModel extends ITask, mongoose.Document {}

export const TaskSchema = new mongoose.Schema<ITaskModel>({
	title: { type: String },
	description: { type: String},
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	status: { type: String, enum: ["todo", "inProgress", "complete"] }

}, {
	timestamps: true
});

const Task = mongoose.model<ITaskModel>("Task", TaskSchema);

export default Task;