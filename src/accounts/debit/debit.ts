import { get_user_record } from "../../users/authentication";
import { IDebitCard } from "./interfaces";

export async function getBalance(token: string): Promise<IDebitCard | void> {
	const user = await get_user_record(token);
}
