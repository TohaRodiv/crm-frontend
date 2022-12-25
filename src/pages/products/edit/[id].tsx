import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { productRepo } from '#repositories/endpoints';
import { productSchema } from '#schemas/product-schema';
import { TProduct } from '#types/TProduct';
import { GetServerSideProps, NextPage } from 'next';


type TProps = {
	entity: TProduct | null
}

const ProductEdit: NextPage<TProps> = ({
	entity,
}) => {
	return (
		<EntityCreateEdit
			path='/products'
			repo={productRepo}
			schema={productSchema}
			entity={entity}
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

			props.entity = await productRepo.getById(id);
		} catch (error) {
			console.error((error as Error).message);
		}

	return {
		props,
		notFound: !props.entity
	};
};

export default ProductEdit;