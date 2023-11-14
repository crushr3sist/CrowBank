export interface DebitCard {
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

export interface DebitCardsState {
	debitCards: DebitCard[];
}
