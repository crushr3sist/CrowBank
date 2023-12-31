import db from "../db";
import { CardGenerator } from "./cardGenerator";
import { UserService } from "./userService";
import { AccountService } from "./accountService";

export default class CardService {
	private cardGenerator: CardGenerator;
	private userService: UserService;
	private accountService: AccountService;
	constructor() {
		this.cardGenerator = new CardGenerator();
		this.userService = new UserService();
		this.accountService = new AccountService();
	}

	/**
	 * The getCard function returns a card generated based on the given date of issue.
	 * @param {Date} dateOfIssue - The date on which the card was issued.
	 * @returns a card generated by the cardGenerator, based on the provided date of issue.
	 */
	getCard(dateOfIssue: Date) {
		return this.cardGenerator.getCard(dateOfIssue);
	}

	/**
	 * The function creates a debit card for a user with the specified user ID and ATM PIN.
	 * @param {string} userId - The userId parameter is a string that represents the unique identifier of
	 * the user for whom the debit card is being created.
	 * @param {number} atmPin - The `atmPin` parameter is the personal identification number (PIN) that
	 * the user will use to access their debit card at an ATM machine. It is a number that the user will
	 * enter to authenticate their identity and authorize transactions.
	 * @returns a promise that resolves to the created debit card object.
	 */
	async createDebitCard(userId: string, atmPin: number) {
		const dateOfIssue = new Date();
		const userAccount = await this.accountService.createAccount(userId);
		const userDetails = await this.userService.getUsersName(userId);
		const cardDetails = this.cardGenerator.getCard(dateOfIssue);

		return await db.prisma.debit.create({
			data: {
				userId: userId,
				ATMPin: `${atmPin}`,
				CardNumber: cardDetails.CardNumber,
				CVV: cardDetails.CVV,
				CardType: "Debit",
				CardIssuedDate: cardDetails.CardIssuedDate,
				CardExpiryDate: cardDetails.CardExpiryDate,
				CardHolderName: `${userDetails?.firstName} ${userDetails?.lastName}`,
				balance: 0.0,
				savings: 0.0,
				account: {
					connect: { id: userAccount.id },
				},
			},
		});
	}

	/**
	 * The `cancelDebitCard` function cancels a debit card by deleting it from the database, along with
	 * its associated account if it exists.
	 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
	 * of the user who owns the debit card.
	 * @param {number} debitCardId - The `debitCardId` parameter is the unique identifier of the debit
	 * card that needs to be canceled.
	 */
	static async cancelDebitCard(userId: string, debitCardId: number) {
		const debitCard = await db.prisma.debit.findFirst({
			where: {
				id: debitCardId,
			},
			select: {
				userId: true,
				accountId: true,
			},
		});
		if (!debitCard || debitCard.userId !== userId) {
			throw new Error(
				"Unauthorized: User does not own the specified debit card",
			);
		}
		await db.prisma.debit.delete({
			where: {
				id: debitCardId,
			},
		});
		const account = await db.prisma.account.findFirst({
			where: {
				id: debitCard.accountId as number,
			},
		});
		if (account) {
			await db.prisma.account.delete({
				where: {
					id: account.id,
				},
			});
		}
	}
}
