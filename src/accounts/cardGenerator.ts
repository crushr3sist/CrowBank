import { ICard } from "./interfaces";

export class CardGenerator {
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
	 * @returns The function `generateCVV()` returns a string consisting of three random digits between 0
	 * and 4.
	 */
	generateCVV(): string {
		return `${Math.floor(Math.random() * 5)}${Math.floor(
			Math.random() * 5,
		)}${Math.floor(Math.random() * 5)}`;
	}

	/**
	 * The function generates an expiry date that is 4 years and 2 months from the given date of issue.
	 * @param {Date} dateOfIssue - The dateOfIssue parameter is the date when the document or item was
	 * issued.
	 * @returns a string representation of the expiry date in the format "dd/mm/yyyy".
	 */
	generateExpireDate(dateOfIssue: Date): string {
		// expiry date is 4 years and 2 months from DOI
		const expiryDate = new Date(dateOfIssue);
		expiryDate.setFullYear(expiryDate.getFullYear() + 4);
		expiryDate.setMonth(expiryDate.getMonth() + 2);

		return expiryDate.toLocaleDateString("en-AU");
	}

	/**
	 * The function "getCard" generates a new card record with a card number, CVV, card type, card issued
	 * date, and card expiry date.
	 * @param {Date} dateOfIssue - The `dateOfIssue` parameter is the date on which the card is issued.
	 * @returns an object of type ICard.
	 */
	getCard(dateOfIssue: Date): ICard {
		const cardRecord: ICard = {
			CardNumber: this.generateCardNumber(),
			CVV: this.generateCVV(),
			CardType: "MasterCard",
			CardIssuedDate: dateOfIssue.toLocaleDateString(),
			CardExpiryDate: this.generateExpireDate(dateOfIssue),
		};
		return cardRecord;
	}
}
