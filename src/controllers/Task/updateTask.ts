import Task from "../../model/task";
import responses from "../../utils/responses";

class UpdateTaskController {
	public static async run (req, res): Promise<any> {
		try {
			const id = req.params.id;
			const task = await Task.findByIdAndUpdate(id, req.body, {new: true});
			res.json({
				message: responses.taskUpdatedSuccessfully,
				task
			});
		}	catch (error) {
			res.status(500).json({ errors: error });
		}
	}
}

export default UpdateTaskController;