import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { productRepo } from '#repositories/endpoints';
import { productSchema } from '#schemas/product-schema';
import { NextPage } from 'next';

const ProductAdd: NextPage = () => {
	return (
		<EntityCreateEdit
			path='/products'
			repo={productRepo}
			schema={productSchema}
			saveMessage='Товар сохранен!'
		/>
	);
};

export default ProductAdd;