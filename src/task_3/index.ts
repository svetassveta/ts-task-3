/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	public id: number;
	public store: Set<Currency> = new Set<Currency>()

	public withdraw(currency: Currency) {
		this.store.forEach((value) => {
			if (value.name === currency.name && value.value >= currency.value) {
			  value.value -= currency.value;
			}
			else {
			  throw new Error();
			}
		  });
	}

	public deposit(currency: Currency) {
		let isTrue = true;
		this.store.forEach(vault => {
			if (vault.name === currency.name) {
				isTrue = false;
				vault.value += currency.value;
			}
		});
		if (isTrue) {
			this.store.add(currency);
		}
	}

	transfer (currency: Currency, vault: Vault) {
		this.withdraw(currency);
		vault.deposit(currency);
	}
}


export interface ISecureVaultRequisites{
	withdraw(currency: Currency): void;
	deposit(currency: Currency): void;
	transfer(currency: Currency, vault: Vault): void;
}
