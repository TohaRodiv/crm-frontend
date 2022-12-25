import { EntityView } from '#organisms/entity-view';
import { productRepo } from '#repositories/endpoints';
import { productSchema } from '#schemas/product-schema';
import { TProduct } from '#types/TProduct';
import { GetServerSideProps, NextPage } from 'next';

type TProps = {
	items: TProduct[]
}

const Products: NextPage<TProps> = ({
	items
}) => {
	return (
		<EntityView
			items={items}
			path='/products'
			repo={productRepo}
			schema={productSchema}
			deleteMessage='Товар удален!'
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		items: [],
	};

	props.items = await productRepo.getMany();

	return {
		props,
	};
};

export default Products;