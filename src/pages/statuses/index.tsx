import { EntityView } from '#organisms/entity-view';
import { statusRepo } from '#repositories/endpoints';
import { statusSchema } from '#schemas/status-schema';
import { TStatus } from '#types/TStatus';
import type { GetServerSideProps, NextPage } from 'next';

type TProps = {
	items: TStatus[]
}

const StatusesPage: NextPage<TProps> = ({
	items,
}) => {

	return (
		<EntityView
			items={items}
			path='/statuses'
			repo={statusRepo}
			schema={statusSchema}
			onAdd={false}
			onDelete={false}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		items: [],
	};

	props.items = await statusRepo.getMany();

	return {
		props,
	};
};

export default StatusesPage;