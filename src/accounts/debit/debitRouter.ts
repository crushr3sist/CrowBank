import { verifyToken } from "../../middlewares/tokenMiddleware";
import { verifyTransaction } from "../../middlewares/transactionMiddleware";
import { Request, Response, NextFunction } from "express";
import { IBodyInternal } from "./interfaces";

import express from "express";
import { getBalance } from "./debit";
import { JwtPayload } from "jsonwebtoken";

const debitRouter = express.Router();

debitRouter.use(verifyToken);
// debitRouter.use(verifyTransaction);

debitRouter.get("/balance", async (req: Request, res: Response) => {
	const user: JwtPayload = (req as any).decoded;
	const debitData = await getBalance(user.user.id);

	res.status(200).send({ balanceBody: debitData });
});

debitRouter.post(
	"/transfer/internal",
	(req: Request<IBodyInternal>, res: Response) => {},
);

debitRouter.get("/transfer/external", (req: Request, res: Response) => {
	res.status(200);
});

debitRouter.get("/transfer/receive", (req: Request, res: Response) => {
	res.status(200);
});

debitRouter.get("/transfer/external", (req: Request, res: Response) => {
	res.status(200);
});

export default debitRouter;
