import { ICard } from "./interfaces";
import db from "../db";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
type PrismaTempClient = Omit<
	PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
	"$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

class createCard {
	dateOfIssue: Date;

	constructor() {
		this.dateOfIssue = new Date();
	}

	/**
	 * The function generates a random 15-digit card number starting with the prefix "5".
	 * @returns The function `generateCardNumber()` returns a randomly generated card number as a string.
	 */
	generateCardNumber(): string {
		let prefix = "5";
		for (let i = 0; i < 14; i++) {
			prefix += Math.floor(Math.random() * 10).toString();
		}
		const cardNumber = prefix;
		return cardNumber;
	}

	/**
	 * The function calculates the Luhn checksum for a given card number.
	 * @param {string} cardNumber - The `cardNumber` parameter is a string representing a credit card
	 * number.
	 * @returns The function `calculateLuhnChecksum` returns a number, which is the Luhn checksum of the
	 * given card number.
	 */
	calculateLuhnChecksum(cardNumber: string): number {
		const digits = cardNumber.split("").map(Number);

		for (let i = digits.length - 2; i >= 0; i -= 2) {
			digits[i] *= 2;
			if (digits[i] > 9) {
				digits[i] -= 9;
			}
		}

		const sum = digits.reduce((acc, digit) => acc + digit, 0);
		return (10 - (sum % 10)) % 10;
	}

	/**
	 * The function generates a random three-digit CVV number.
	 * @returns a randomly generated CVV (Card Verification Value) code.
	 */
	generateCVV() {
		return `${Math.floor(Math.random() * 5)}${Math.floor(
			Math.random() * 5,
		)}${Math.floor(Math.random() * 5)}`;
	}

	/**
	 * The function generates an expiry date that is 4 years and 2 months from the date of issue.
	 * @returns The function `generateExpireDate()` returns the expiry date of a document in the format
	 * "dd/mm/yyyy".
	 */
	generateExpireDate() {
		// expiry date is 4 years and 2 months from DOI
		const expiryDate = new Date(this.dateOfIssue);
		expiryDate.setFullYear(expiryDate.getFullYear() + 4);
		expiryDate.setMonth(expiryDate.getMonth() + 2);

		return expiryDate.toLocaleDateString("en-AU");
	}

	/**
	 * The function returns the date of issue in a localized string format.
	 * @returns The method `getDateOfIssue()` returns the date of issue as a string in the format of a
	 * localized date string.
	 */
	getDateOfIssue() {
		return this.dateOfIssue.toLocaleDateString();
	}

	/**
	 * The function `getCardNumber()` generates a complete card number by combining a prefix and a suffix.
	 * @returns The function `getCardNumber()` returns a complete card number, which is a combination of a
	 * card prefix and a card suffix.
	 */
	getCardNumber() {
		const cardPrefix = this.generateCardNumber();
		const cardSuffix = this.calculateLuhnChecksum(cardPrefix);
		const cardNumber = cardPrefix + cardSuffix;
		return cardNumber;
	}

	/**
	 * The function `getCard` returns a promise that resolves to an object representing a debit card with
	 * various properties.
	 * @returns a Promise that resolves to an object of type ICard.
	 */
	async getCard(): Promise<ICard> {
		const cardRecord: ICard = {
			CardNumber: newDebit.getCardNumber(),
			CVV: newDebit.generateCVV(),
			CardType: "MasterCard",
			CardIssuedDate: newDebit.getDateOfIssue(),
			CardExpiryDate: newDebit.generateExpireDate(),
		};
		return await cardRecord;
	}

	verifyElements() {
		// search the database for the elements
	}

	/**
	 * The function creates a new account for a user using the provided Prisma client and user ID.
	 * @param {PrismaTempClient} prismaClient - The `prismaClient` parameter is an instance of the Prisma
	 * client that is used to interact with the database. It allows you to perform CRUD operations on the
	 * database tables.
	 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
	 * of the user for whom the account is being created.
	 * @returns the created user account.
	 */
	async createAccount(prismaClient: PrismaTempClient, userId: string) {
		const userAccount = await prismaClient.account.create({
			data: {
				userId,
			},
		});
		return userAccount;
	}

	/**
	 * The function `getUsersName` retrieves the name of a user from a database using their ID.
	 * @param prismaClient - An object that contains a property `user` which is an object with a method
	 * `findFirst`. This method takes an argument `where` which is an object with a property `id` of type
	 * string.
	 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
	 * of a user.
	 * @returns the user record that matches the provided userId.
	 */
	async getUsersName(
		prismaClient: {
			user: { findFirst: (arg0: { where: { id: string } }) => any };
		},
		userId: string,
	) {
		const userRecord = await prismaClient.user.findFirst({
			where: {
				id: userId,
			},
		});
		return userRecord;
	}

	/**
	 * The function creates a debit card for a user with the provided ATM pin and connects it to their
	 * account.
	 * @param {PrismaTempClient} prismaClient - The Prisma client is a database client that allows you to
	 * interact with your database using Prisma's query API.
	 * @param {string} userId - The unique identifier of the user for whom the debit card is being
	 * created.
	 * @param {number} atmPin - The ATM pin is a 4-digit number that is used to authenticate the user when
	 * using the debit card at an ATM machine.
	 * @returns a promise that resolves to the created debit card object.
	 */
	async createDebitCard(
		prismaClient: PrismaTempClient,
		userId: string,
		atmPin: number,
	) {
		const userAccount = await this.createAccount(prismaClient, userId);
		const userDetails = await this.getUsersName(prismaClient, userId);
		const cardDetails = await this.getCard();

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
	 * The function `singleExecCreateAndCommit` creates a user account and a debit card for the specified
	 * user ID, and returns the newly created debit card.
	 * @param {string} userId - A string representing the user's ID.
	 * @param {number} atmPin - The `atmPin` parameter is a number that represents the ATM PIN (Personal
	 * Identification Number) for the debit card.
	 * @returns The function `singleExecCreateAndCommit` returns the `newDebitCard` object.
	 */
	async singleExecCreateAndCommit(userId: string, atmPin: number) {
		const dualCommitInstance = await db.prisma.$transaction(
			async (prismaClient) => {
				const userAccount = await this.createAccount(prismaClient, userId);

				const newDebitCard = await this.createDebitCard(
					prismaClient,
					userId,
					atmPin,
				);
				return newDebitCard;
			},
		);
		return dualCommitInstance;
	}
}

const newDebit = new createCard();

console.log(newDebit.getCard());
