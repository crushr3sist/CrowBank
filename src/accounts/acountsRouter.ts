import express from "express";

const accountRouter = express.Router();

accountRouter.get("/", (req, res) => {
	res.status(200);
});

accountRouter.post("/create", (req, res) => {
	/** user fills out a form in the frontend, and the backend creates a card record.
	 * user's are only permitted 1 card for now
	 *
	 */

	res.status(200);
});

accountRouter.post("/fetch", (req, res) => {
	res.status(200);
});

accountRouter.delete("/cancel", (req, res) => {
	res.status(200);
});

accountRouter.post("/account/statement", (req, res) => {
	res.status(200);
});

export default accountRouter;
