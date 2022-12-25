import { TAccount } from '#types/TAccount';
import { TSchema } from '#types/TSchema';

export const accountSchema: TSchema<TAccount> = {
	id: {
		type: 'primary-key',
		title: 'ID',
		display: false,
	},
	recivied_at: {
		type: 'date',
		title: 'Дата поступления',
		width: 200,
	},
	title: {
		type: 'string',
		required: true,
		title: 'Наименование',
	},
	sum: {
		type: 'number',
		format: 'currency',
		required: true,
		title: 'Сумма, ₽',
		display: false,
	},
};