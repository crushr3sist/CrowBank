// accountService.ts
import db from "../db";

export class AccountService {
	/**
	 * The function creates a user account in a database using the provided user ID.
	 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
	 * of the user for whom the account is being created.
	 * @returns the user account that was created in the database.
	 */
	async createAccount(userId: string) {
		const userAccount = await db.prisma.account.create({
			data: {
				userId,
			},
		});
		return userAccount;
	}

	/**
	 * The function `getDebitCards` retrieves all debit cards associated with a given user ID.
	 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
	 * of a user.
	 * @returns an array of debit cards.
	 */
	static async getDebitCards(userId: string) {
		const linkedAccountIds = await db.prisma.account.findMany({
			where: {
				userId: userId,
			},
			select: {
				id: true,
			},
		});
		const accountIds = linkedAccountIds.map((account) => account.id);
		const debitCards = await db.prisma.debit.findMany({
			where: {
				userId: userId,
				accountId: {
					in: accountIds,
				},
			},
		});
		return debitCards;
	}
}
