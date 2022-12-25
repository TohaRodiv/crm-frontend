import { EntityCreateEdit } from '#organisms/entity-create-edit';
import { userRepo } from '#repositories/endpoints';
import { userSchema } from '#schemas/user-schema';
import { NextPage } from 'next';

const UserAdd: NextPage = () => {
	return (
		<EntityCreateEdit
			path='/users'
			repo={userRepo}
			schema={userSchema}
			saveMessage='Пользователь сохранен!'
		/>
	);
};

export default UserAdd;