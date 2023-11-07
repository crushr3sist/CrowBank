export interface ICard {
	CardNumber: string; //1234 5678 9012 3456
	CVV: string; // 123
	CardType: string; // MasterCard
	CardIssuedDate: string;
	CardExpiryDate: string; // 12/29
}
export interface ICardUserSpecific extends ICard {
	CardHolderName: string; // john doe
	ATMPin: number;
}
export interface ICardComplete extends ICardUserSpecific {
	balance: number;
	savings: number;
}
