import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { orderRepo } from '#repositories/endpoints';
import { orderSchema } from '#schemas/order-schema';
import { NextPage } from 'next';

const OrderAdd: NextPage = () => {
	return (
		<EntityCreateEdit
			path='/orders'
			repo={orderRepo}
			schema={orderSchema}
			saveMessage='Заказ сохранен!'
		/>
	);
};

export default OrderAdd;