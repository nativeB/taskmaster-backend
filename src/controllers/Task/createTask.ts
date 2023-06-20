import Task from "../../model/task";
import responses from "../../utils/responses";

class CreateTaskController {
	public static async run (req, res): Promise<void> {
		try{
			const task = new Task(req.body);
			await task.save();
			res.json({
				message: responses.taskCreatedSuccessfully,
				task
			});
		} catch (error) {
			res.status(500).json({ errors: error });
		}
	}
}

export default CreateTaskController;