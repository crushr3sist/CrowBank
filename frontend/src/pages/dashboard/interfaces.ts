export interface IDebitCard {
	id: number;
	userId: string;
	ATMPin: string;
	CardNumber: string;
	CVV: string;
	CardType: string;
	CardIssuedDate: string;
	CardExpiryDate: string;
	CardHolderName: string;
	balance: number;
	savings: number;
	accountId: number;
}
