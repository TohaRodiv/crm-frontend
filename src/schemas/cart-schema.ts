import { orderRepo, productRepo } from '#repositories/endpoints';
import { TCart } from '#types/TCart';
import { TSchema } from '#types/TSchema';

export const cartSchema: TSchema<TCart> = {
	id: {
		type: 'primary-key',
		title: 'ID',
		display: false,
	},
	order: {
		type: 'relation',
		format: 'many-to-one',
		repo: orderRepo,
		title: 'Заказ',
		render: (order) => order ? `${order.id}` : null,
		referenceField: 'id',
		hidden: true,
	},
	product: {
		type: 'relation',
		format: 'many-to-one',
		repo: productRepo,
		title: 'Товар',
		render: (product) => product.name,
		required: true,
	},
	count: {
		type: 'number',
		title: 'Кол-во',
		required: true,
		defaultValue: 1,
	},
	sum: {
		type: 'number',
		format: 'currency',
		title: 'Сумма',
		required: true,
	}
};