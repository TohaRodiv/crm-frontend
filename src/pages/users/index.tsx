import { EntityView } from '#organisms/entity-view';
import { userRepo } from '#repositories/endpoints';
import { userSchema } from '#schemas/user-schema';
import { TUser } from '#types/TUser';
import type { ColumnsType } from 'antd/lib/table';
import type { GetServerSideProps, NextPage } from 'next';

type TProps = {
	items: TUser[]
}

const columnsAfter: ColumnsType<TUser> = [
	{
		title: 'ФИО',
		dataIndex: 'fio',
		key: 'fio',
		render: (_, {name, surname, patronymic }) => `${surname} ${name} ${patronymic}`.trim(),
	}
];

const UsersPage: NextPage<TProps> = ({
	items,
}) => {
	return (
		<EntityView
			items={items}
			path='/users'
			repo={userRepo}
			schema={userSchema}
			deleteMessage='Пользователь удален!'
			columnsAfter={columnsAfter}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		items: [],
	};

	props.items = await userRepo.getMany();

	return {
		props,
	};
};

export default UsersPage;