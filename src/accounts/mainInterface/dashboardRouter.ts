import express from "express";

const dashboardRouter = express.Router();
dashboardRouter.get("/", (req, res) => {
	res.status(200);
});
export default dashboardRouter;
