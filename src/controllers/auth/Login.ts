import User from "../../model/user";
import responses from "../../utils/responses";
import * as jwt from "jsonwebtoken";
class LoginController {
	public static async run (req, res): Promise<any> {
		try{

		const email = req.body.email.toLowerCase();
		const password = req.body.password;

		const user = await User.findOne({email: email})
		.select("+password")

		if (!user) {
			return res.status(404).json({
				errors: [
					responses.userNotFound
				]
			});
		}

		if (! user.password) {
			return res.status(404).json({
				errors: 
				[
					responses.userNotFound
				]
			});
		}

		user.comparePassword(password, (err, isMatch) => {
				if (err) {
					return res.status(401).json({
						errors: [err]
					});
				}

				if (!isMatch) {
					return res.status(401).json({
						errors: [responses.passwordsDoNotMatch]
					});
				}

				const token = jwt.sign(
					{ email, _id: user._id },
					process.env.JWT_SECRET as string,
					{ expiresIn: process.env.JWT_TIMEOUT || 360 }
				);

				


				return res.json({
					user: {
						email: user.email,
					},
					token
				});
			});

		} catch (error) {
			res.status(500).json({ errors: error });
		}
	}

	//check route to basically see if the token is valid
	public static async check (req, res): Promise<any> {
		try{
			const {email, _id} = req.auth
			res.json({
				auth: {
					email,
					_id
				}
			});
		} catch (error) {
			res.status(500).json({ errors: error });
		}
	}
}

export default LoginController;