
class DeleteTaskController {
	public static run (req, res): any {
		res.json({
			result: "delete tasks",
		});
	}
}

export default DeleteTaskController;