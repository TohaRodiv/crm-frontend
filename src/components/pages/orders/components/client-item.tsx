import { EntityTable } from '#organisms/entity-table';
import { FormCreateEdit } from '#organisms/form-create-edit';
import { userRepo } from '#repositories/endpoints';
import { userSchema } from '#schemas/user-schema';
import { TUser } from '#types/TUser';
import { UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { FC, useState } from 'react';

type TProps = {
	form: FormInstance
}

const columnsAfter: ColumnsType<TUser> = [
	{
		title: 'ФИО',
		dataIndex: 'fio',
		key: 'fio',
		render: (_, { name, surname, patronymic }) => `${surname} ${name} ${patronymic}`.trim(),
	}
];

const ClientItem: FC<TProps> = ({
	form,
}) => {

	const [openSelectModal, setOpenSelectModal] = useState(false);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [items, setItems] = useState<TUser[]>([]);
	const [client, setClient] = useState<TUser | null>(null);
	const [formClient] = Form.useForm();
	const clientName = client ? `${client.surname ? `${client.surname}` : ''}${client.name ? ` ${client.name}` : ''}${client.patronymic ? ` ${client.patronymic}` : ''}`.trim() : '';

	const handleOpenSelectModal = () => {
		setOpenSelectModal(true);

		(async () => {
			const users = (await userRepo.getMany()).map(user => ({ key: user.id, ...user }));
			setItems(users);
		})();
	};

	const handleOpenCreateModal = () => {
		setOpenCreateModal(true);
	};

	const handleCancelSelectModal = () => {
		setOpenSelectModal(false);
	};

	const handleCancelCreateModal = () => {
		setOpenCreateModal(false);
	};

	const handleSelect = (client: TUser) => {
		setClient(() => {
			form.setFieldsValue({ user: null });
			client && form.setFieldsValue({ user: { id: client.id } });
			setOpenSelectModal(false);
			return client;
		});
	};

	const handleReset = () => {
		setClient(() => {
			form.setFieldsValue({ user: null });
			return null;
		});
	};

	const handleCreate = async (client: TUser): Promise<void> => {
		setClient(() => {
			form.setFieldsValue({ user: null });
			form.setFieldsValue({ user: client });
			return client;
		});
		setOpenCreateModal(false);
	};

	return (
		<>
			<Form.Item name='user' label='Клиент' rules={[{ required: true, message: 'Пользователь не выбран' }]}>
				<Input.Group
					style={{ display: 'flex' }}
					compact>
					<Input
						value={clientName}
						disabled />
					{/* <Button
						icon={<UserDeleteOutlined />}
						onClick={() => handleReset()}>
						Очистить
					</Button> */}
					<Button
						icon={<UserSwitchOutlined />}
						onClick={() => handleOpenSelectModal()}>
						Выбрать
					</Button>
					<Button
						icon={<UserAddOutlined />}
						onClick={() => handleOpenCreateModal()}>
						Создать
					</Button>
				</Input.Group>
			</Form.Item>
			<Modal
				open={openSelectModal}
				onCancel={() => handleCancelSelectModal()}
				title='Выбрать клиента'>
				<EntityTable
					schema={userSchema}
					items={items}
					columnsAfter={columnsAfter}
					onSelect={handleSelect}
				/>
			</Modal>
			<Modal
				open={openCreateModal}
				onCancel={() => handleCancelCreateModal()}
				onOk={() => formClient.submit()}
				title='Новый клиент'>
				<FormCreateEdit
					schema={userSchema}
					form={formClient}
					onSave={handleCreate}
				/>
			</Modal>
		</>
	);
};

export {
	ClientItem
};
