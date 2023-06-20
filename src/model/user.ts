
import { IUser } from "../interfaces/model/users";
import mongoose from "../providers/database";

export interface IUserModel extends IUser, mongoose.Document {}

export const UserSchema = new mongoose.Schema<IUserModel>({
	email: { type: String, unique: true },
	password: { type: String },
	firstName: { type: String },
    lastName: { type: String },
    token: { type: String },
}, {
	timestamps: true
});

const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;