import Task from "../../model/task";
import responses from "../../utils/responses";

class GetTaskController {
	public static async run (req, res): Promise<any> {
		try {
			const tasks = await Task.find({ userId: req.auth._id }).sort({ createdAt: -1 }).select("+userId");


			res.json({
				message: responses.taskGetSuccessfully,
				tasks
			});
		}	catch (error) {
			res.status(500).json({ errors: error });
		}
	}
}

export default GetTaskController;