import db from "../db";

export default class Transaction {
	spendingAmount: number;
	senderId: string;
	receiverId: string;
	accountBalance: string;
	cardType: string;
	userId: string;

	constructor(
		spendingAmount: number,
		senderId: string,
		receiverId: string,
		accountBalance: string,
		cardType: string,
		userId: string,
	) {
		this.spendingAmount = spendingAmount;
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.accountBalance = accountBalance;
		this.cardType = cardType;
		this.userId = userId;
	}

	apply() {
		const cardInstance = db.prisma.account.create({
			data: {
				userId: this.userId,
				debitCards: {},
				transactions: {},
			},
			include: {
				debitCards: true,
				transactions: true,
			},
		});
	}
}
