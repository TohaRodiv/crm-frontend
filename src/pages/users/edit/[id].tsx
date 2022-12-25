import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { userRepo } from '#repositories/endpoints';
import { userSchema } from '#schemas/user-schema';
import { TUser } from '#types/TUser';
import { GetServerSideProps, NextPage } from 'next';


type TProps = {
	entity: TUser | null
}

const UserEdit: NextPage<TProps> = ({
	entity,
}) => {
	return (
		<EntityCreateEdit
			path='/users'
			repo={userRepo}
			schema={userSchema}
			entity={entity}
			saveMessage='Пользователь сохранен!'
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

			props.entity = await userRepo.getById(id);
		} catch (error) {
			console.error((error as Error).message);
		}

	return {
		props,
		notFound: !props.entity,
	};
};

export default UserEdit;