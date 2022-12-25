import { CurrencyFormatter } from './currency-formatter';

export const FormatInputCurrency = (value: any) =>
	`${value ? CurrencyFormatter.format(+value) : 0}`
		.replace(' ₽', '');