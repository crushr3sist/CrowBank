import { ICard } from "./interfaces";
import db from "../db";

class createCard {
	dateOfIssue: Date;

	constructor() {
		this.dateOfIssue = new Date();
	}

	generateCardNumber(): string {
		let prefix = "5";
		for (let i = 0; i < 14; i++) {
			prefix += Math.floor(Math.random() * 10).toString();
		}
		const cardNumber = prefix;
		return cardNumber;
	}

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

	generateCVV() {
		return `${Math.floor(Math.random() * 5)}${Math.floor(
			Math.random() * 5,
		)}${Math.floor(Math.random() * 5)}`;
	}

	generateExpireDate() {
		// expiry date is 4 years and 2 months from DOI
		const expiryDate = new Date(this.dateOfIssue);
		expiryDate.setFullYear(expiryDate.getFullYear() + 4);
		expiryDate.setMonth(expiryDate.getMonth() + 2);

		return expiryDate.toLocaleDateString("en-AU");
	}

	getDateOfIssue() {
		return this.dateOfIssue.toLocaleDateString();
	}

	getCardNumber() {
		const cardPrefix = this.generateCardNumber();
		const cardSuffix = this.calculateLuhnChecksum(cardPrefix);
		const cardNumber = cardPrefix + cardSuffix;
		return cardNumber;
	}

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

	async createAccount(userId: string) {
		// we encrypt the card details symmetrically with the user's id as the key
		// but we provide a physical card identity that's saved on the client side

		const userAccount = await db.prisma.account.create({
			data: {
				userId,
			},
		});
		return userAccount;
	}

	async getUsersName(userId: string) {
		const userRecord = await db.prisma.user.findFirst({
			where: {
				id: userId,
			},
		});
		return userRecord;
	}

	async createDebitCard(userId: string, atmPin: number) {
		const userAccount = await this.createAccount(userId);
		const userDetails = await this.getUsersName(userId);
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
}

const newDebit = new createCard();

console.log(newDebit.getCard());
