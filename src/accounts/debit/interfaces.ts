import { ICard } from "../interfaces";

export interface IDebitCard {
	AccountStatus: string; // active
	AvailableBalance: number; // $1000
	Transactions: string | any[];
}
export interface IDebitCardExtended extends ICard {
	AccountStatus: string; // active
	AvailableBalance: string; // $1000
	Transactions: string | any[];
}

export interface IDebitCreation extends ICard {
	CreationDate: string;
	BillingAddress: string;
	ContactInformation: string;
	TaxNumber: string;
}

export interface IAccountTransfer {
	accountId: string;
	transferAmount: number;
}
export interface IBodyInternal {
	accountFrom: IAccountTransfer;
	accountTo: IAccountTransfer;
}
