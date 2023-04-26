import { Link } from '#atoms/link';
import { productRepo, statusRepo, userRepo } from '#repositories/endpoints';
import { TOrder } from '#types/TOrder';
import { TSchema } from '#types/TSchema';

export const orderSchema: TSchema<TOrder> = {
	id: {
		type: 'primary-key',
		title: 'ID',
		display: false,
	},
	user: {
		type: 'relation',
		format: 'many-to-one',
		repo: userRepo,
		title: 'Клиент',
		render: (_, { user }) =>
			user ? (
				// TODO: Внедрить фильтр
				<Link href={`/users?filter[id]=${user.id}`}>
					{`${user.surname} ${user.name} ${user.patronymic}`.trim()}
				</Link>
			) : null,
		renderLabel: (item) => `${item.id}. ${item.surname} ${item.name} ${item.patronymic}`.trim(),
	},
	status: {
		type: 'relation',
		format: 'many-to-one',
		repo: statusRepo,
		title: 'Статус',
		render: (_, { status }) =>
			status ? (
				<Link href={`/statuses?filter[id]=${status.id}`}>
					{status.title}
				</Link>
			): null,
	},
	products: {
		type: 'relation',
		format: 'many-to-many',
		repo: productRepo,
		title: 'Товары',
		display: false,
	},
	sum: {
		type: 'number',
		format: 'currency',
		title: 'Итого',
	},
	comment: {
		type: 'textarea',
		title: 'Комментарий',
	},
	created_at: {
		type: 'date-time',
		title: 'Создан',
		width: 200,
		edit: false,
	},
	updated_at: {
		type: 'date-time',
		title: 'Изменен',
		width: 200,
		edit: false,
	},
};