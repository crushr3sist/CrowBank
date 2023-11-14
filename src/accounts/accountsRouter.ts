import express from "express";
import { Router, Request, Response } from "express";

import { verifyToken } from "../middlewares/tokenMiddleware";
import { JwtPayload } from "jsonwebtoken";
import CardService from "./accounts";
import { AccountService } from "./accountService";

const accountRouter: Router = express.Router();

accountRouter.use(verifyToken);

accountRouter.post("/create", async (req: Request, res: Response) => {
	try {
		const user = await (req as any).decoded;
		const newDebit = new CardService();
		const newDebitCard = await newDebit.createDebitCard(
			user.user.id,
			req.body.atmPin,
		);
		res.status(200).send({ cardData: newDebitCard });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: `error occurred ${err}` }).sendDate;
	}
});

accountRouter.get("/fetch", async (req: Request, res: Response) => {
	try {
		const user = await (req as any).decoded;
		const debitCards = await AccountService.getDebitCards(user.user.id);
		res.status(200).send(debitCards);
	} catch (e) {
		res.status(500).send({ error: e });
	}
});

accountRouter.delete("/cancel", async (req: Request, res: Response) => {
	try {
		const user: JwtPayload = (req as any).decoded;
		const debitCardId: number = parseInt(req.body.debitCardId);

		if (!debitCardId) {
			throw new Error("Debit card ID is required in the request body");
		}

		await CardService.cancelDebitCard(user.user.id, debitCardId);

		res.status(200).send({
			message: "Debit card and associated account canceled successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: `Error occurred: ${err.message || err}` });
	}
});

accountRouter.post("/account/statement", (req: Request, res: Response) => {
	const user: JwtPayload = (req as any).decoded;
	res.status(200).sendStatus(200);
});

export default accountRouter;

/**
 *
 * frontend is going to have drop down forms
 * they're for internal transfers
 * 2 drop downs and user can either chose savings or checking
 *
 */
