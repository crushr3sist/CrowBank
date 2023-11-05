import { ICard } from "../interfaces";

export interface ICreditCard extends ICard {
	AccountStatus: string; // active
	AvailableBalance: string; // $1000
	Transactions: string[];
}

export interface ICreditCreation extends ICard {
	CreationDate: string;
	BillingAddress: string;
	ContactInformation: string;
	TaxNumber: string;
	SpendingLimit: number;
}
