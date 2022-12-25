import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { statusRepo } from '#repositories/endpoints';
import { statusSchema } from '#schemas/status-schema';
import { TStatus } from '#types/TStatus';
import { GetServerSideProps, NextPage } from 'next';


type TProps = {
	entity: TStatus | null
}

const StatusEdit: NextPage<TProps> = ({
	entity,
}) => {
		return (
			<EntityCreateEdit
				path='/statuses'
				repo={statusRepo}
				schema={statusSchema}
				entity={entity}
				saveMessage='Статус сохранен!' />
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

		props.entity = await statusRepo.getById(id);
	} catch (error) {
		console.error((error as Error).message);
	}

	return {
		props,
		notFound: !props.entity,
	};
};

export default StatusEdit;