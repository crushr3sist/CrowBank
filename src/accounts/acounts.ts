class createCard {
	cardType: string;

	constructor(cardType: string) {
		this.cardType = cardType;
	}

	generateCreditCardNumber(): string {
		// const cardType = Math.random() < 0.5 ? "Visa" : "Mastercard";
		// const cardType = "Mastercard";

		let prefix = "";
		// if (cardType === "Visa") {
		prefix = "4";
		// } else {
		prefix = (Math.floor(Math.random() * 5) + 51).toString();
		// }
		const remainingDigits = Array.from({ length: 15 }, () =>
			Math.floor(Math.random() * 10),
		).join("");
		const cardNumber = prefix + remainingDigits;
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

	generateCVV() {}

	generateExpireDate() {}
}

/**
 * users fill out a form
 * they give personal information
 * the backend generates seeded data for their virtual card
 * [
 * 	- card number
 *  - card cvv
 *  - card expire date
 * 	] write a create method for information generation
 * [] write a update method for modifying the card
 *
 */

const newDebit = new createCard("debit");

console.log(newDebit.generateCreditCardNumber());
