import { EntityView } from '#organisms/entity-view';
import { cartRepo } from '#repositories/endpoints';
import { cartSchema } from '#schemas/cart-schema';
import { TCart } from '#types/TCart';
import { NextPage, GetServerSideProps } from 'next';


type TProps = {
	items: TCart[]
}

const CartsPage: NextPage<TProps> = ({
	items,
}) => {
	return (
		<EntityView
			items={items}
			path='/carts'
			repo={cartRepo}
			schema={cartSchema}
			deleteMessage='Корзина удалена!'
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		items: [],
	};

	props.items = await cartRepo.getMany();

	return {
		props,
	};
};

export default CartsPage;