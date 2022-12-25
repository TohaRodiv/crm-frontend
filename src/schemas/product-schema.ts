import { TProduct } from '#types/TProduct';
import { TSchema } from '#types/TSchema';

export const productSchema: TSchema<TProduct> = {
	id: {
		type: 'primary-key',
		title: 'ID',
		display: false,
	},
	name: {
		type: 'string',
		title: 'Наименование',
		required: true,
	},
	description: {
		type: 'textarea',
		title: 'Описание',
	},
	price: {
		type: 'number',
		title: 'Цена',
		format: 'currency',
		required: true,
	},
	is_active: {
		type: 'boolean',
		title: 'Активен',
		format: 'switch',
		defaultValue: true,
	}
};