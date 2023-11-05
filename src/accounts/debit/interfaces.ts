import { ICard } from "../interfaces";

export interface IDebitCard extends ICard {
	AccountStatus: string; // active
	AvailableBalance: string; // $1000
	Transactions: string[];
}

export interface IDebitCreation extends ICard {
	CreationDate: string;
	BillingAddress: string;
	ContactInformation: string;
	TaxNumber: string;
}
