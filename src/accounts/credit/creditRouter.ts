import express from "express";

const creditRouter = express.Router();

creditRouter.get("/", (req, res) => {
	res.status(200);
});

export default creditRouter;
