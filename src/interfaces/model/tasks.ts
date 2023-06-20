import mongoose from "mongoose";

export interface ITask {
	title: string;
	description: string;
	userId: mongoose.Schema.Types.ObjectId;
	status: "todo" | "inProgress" | "done";
}

export default ITask;