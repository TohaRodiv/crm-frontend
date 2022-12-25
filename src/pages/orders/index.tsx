import { EntityView } from '#organisms/entity-view';
import { orderRepo } from '#repositories/endpoints';
import { orderSchema } from '#schemas/order-schema';
import { TOrder } from '#types/TOrder';
import { GetServerSideProps, NextPage } from 'next';

type TProps = {
	items: TOrder[]
}

const OrdersPage: NextPage<TProps> = ({
	items,
}) => {
	return (
		<EntityView
			items={items}
			path='/orders'
			repo={orderRepo}
			schema={orderSchema}
			deleteMessage='Заказ удален!'
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		items: [],
	};

	props.items = await orderRepo.getMany();

	return {
		props,
	};
};

export default OrdersPage;