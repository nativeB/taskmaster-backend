
class LoginController {
	public static run (req, res): any {
		res.json({
			result: "login",
		});
	}
}

export default LoginController;