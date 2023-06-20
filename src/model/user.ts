import * as bcrypt from "bcrypt-nodejs";

import { IUser } from "../interfaces/model/users";
import mongoose from "../providers/database";

export interface IUserModel extends IUser, mongoose.Document {
	comparePassword(password: string, cb: any): string;
}

export const UserSchema = new mongoose.Schema<IUserModel>({
	email: { type: String, unique: true },
	password: { type: String, select: false }
}, {
	timestamps: true
});

UserSchema.pre<IUserModel>("save", function (cb) {
	if (!this.isModified("password")) {
		return cb();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return cb(err);
		}

		bcrypt.hash(this.password, salt, null, (err, hash) => {
			if (err) {
				return cb(err);
			}

			this.password = hash;
			return cb();
		});
	});
});


// password check
UserSchema.methods.comparePassword = function (requestPassword, cb): any {
	bcrypt.compare(requestPassword, this.password, (err, isMatch) => {
		return cb(err, isMatch);
	});
};

const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;