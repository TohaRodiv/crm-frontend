import { TSchema } from '#types/TSchema';
import { TStatus } from '#types/TStatus';

export const statusSchema: TSchema<TStatus> = {
	id: {
		type: 'primary-key',
		title: 'ID',
		width: 50,
	},
	title: {
		type: 'string',
		required: true,
		title: 'Наименование',
	},
};