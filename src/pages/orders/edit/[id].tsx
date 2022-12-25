import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { orderRepo } from '#repositories/endpoints';
import { orderSchema } from '#schemas/order-schema';
import { TOrder } from '#types/TOrder';
import { GetServerSideProps, NextPage } from 'next';

type TProps = {
	entity: TOrder | null
}

const OrderEdit: NextPage<TProps> = ({
	entity,
}) => {
	return (
		<EntityCreateEdit
			path='/orders'
			repo={orderRepo}
			schema={orderSchema}
			entity={entity}
			saveMessage='Заказ сохранен!'
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const props: TProps = {
		entity: null,
	};

	const id = query.id ? +query.id : 0;

	try {
		if (!isFinite(id)) {
			throw new Error(`Идентификатор "${query.id}" не является числом!`);
		}

		props.entity = await orderRepo.getById(id);
	} catch (error) {
		console.error((error as Error).message);
	}

	return {
		props,
		notFound: !props.entity,
	};
};

export default OrderEdit;