import { TCart } from './TCart';
import { TStatus } from './TStatus';
import { TUser } from './TUser';

export type TOrder = {
	id: number
	user: TUser
	status: TStatus
	cart: TCart[]
	created_at: Date
	updated_at: Date
	sum: number;

	comment?: string
	is_test?: boolean
}