import User from "../../model/user";
import responses from "../../utils/responses";

class RegisterController {
	public static async run (req, res): Promise<void> {
		try{
			const user = new User(req.body);
			await user.save();
			res.json({
				message: responses.userCreatedSuccessfully,
				user: {
					email: user.email
				}
			});
		} catch (error) {
			res.status(500).json({ errors: error });
		}
	}
}

export default RegisterController;