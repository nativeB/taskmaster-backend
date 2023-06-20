import Task from "../../model/task";
import responses from "../../utils/responses";

class DeleteTaskController {
	public static async run (req, res): Promise<any> {
		try{
			const id = req.params.id;
			await Task.findByIdAndDelete(id);
			res.json({
				message: responses.taskDeletedSuccessfully
			});
		} catch (error) {
			res.status(500).json({ errors: error });
		}
	}
}

export default DeleteTaskController;