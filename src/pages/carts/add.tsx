import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { cartRepo } from '#repositories/endpoints';
import { cartSchema } from '#schemas/cart-schema';
import { NextPage } from 'next';

const CartAdd: NextPage = () => {
	return (
		<EntityCreateEdit
			path='/carts'
			repo={cartRepo}
			schema={cartSchema}
			saveMessage='Корзина сохранена!'
		/>
	);
};

export default CartAdd;