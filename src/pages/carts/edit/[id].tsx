import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { cartRepo } from '#repositories/endpoints';
import { cartSchema } from '#schemas/cart-schema';
import { TCart } from '#types/TCart';
import { GetServerSideProps, NextPage } from 'next';


type TProps = {
	entity: TCart | null
}

const CartEdit: NextPage<TProps> = ({
	entity,
}) => {
	return (
		<EntityCreateEdit
			path='/carts'
			repo={cartRepo}
			schema={cartSchema}
			entity={entity}
			saveMessage='Корзина сохранена!'
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

		props.entity = await cartRepo.getById(id);
	} catch (error) {
		console.error((error as Error).message);
	}

	return {
		props,
		notFound: !props.entity,
	};
};

export default CartEdit;