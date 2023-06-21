import mongoose from "mongoose";
import { MongoError } from "mongodb";

export class Database {
	//init database
	public static init (): void {   
		mongoose.connect(process.env.MONGO_URI as string)
			.then(() => {
			console.info("connected to mongo server at: " + process.env.MONGO_URI);
		}).catch((error: MongoError) => {
				console.log(error);
				throw error;
		});
	}
}

export default mongoose;