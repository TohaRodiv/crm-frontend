import { TSchema } from '#types/TSchema';
import { TUser } from '#types/TUser';

export const userSchema: TSchema<TUser> = {
	id: {
		type: 'primary-key',
		title: 'ID',
		display: false,
	},
	email: {
		type: 'string',
		title: 'E-mail',
		render: email => email ? <a href={`mailto:${email}`}>{email}</a> : email
	},
	password: {
		type: 'string',
		title: 'Пароль',
		display: false,
	},
	name: {
		type: 'string',
		title: 'Имя',
		display: false,
	},
	surname: {
		type: 'string',
		title: 'Фамилия',
		display: false,
	},
	patronymic: {
		type: 'string',
		title: 'Отчество',
		display: false,
	},
};