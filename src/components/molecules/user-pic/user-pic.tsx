import { SolutionOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { FC } from 'react';
import { UserList } from './user-list';

type TProps = {
	//
}

const items = [
	{
		label: <UserList />,
		key: 'user-list',
	}
];

const UserPic: FC<TProps> = () => {

	return (
		<Dropdown menu={{ items }}>
			<Avatar
				shape='square'
				icon={<SolutionOutlined />}
				size='large'
				style={{ backgroundColor: 'transparent', }}
			/>
		</Dropdown>
	);
};

export {
	UserPic
};