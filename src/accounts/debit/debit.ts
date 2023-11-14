import { AccountService } from "../accountService";
import { IDebitCard } from "./interfaces";

export async function getBalance(userId: string) {
	try {
		const debitCard = await AccountService.getDebitCards(userId);
		return {
			balance: debitCard[0].balance.toFixed(2),
			savings: debitCard[0].savings.toFixed(2),
		};
	} catch (e) {
		console.error(e);
	}
}
