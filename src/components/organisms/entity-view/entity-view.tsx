import { Toolbar } from '#molecules/toolbar';
import { EntityTable } from '#organisms/entity-table';
import { IEndpointRepository } from '#types/IEndpointRepository';
import { TSchema } from '#types/TSchema';
import { message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

type TProps<TEntity> = {
	items: TEntity[]
	path: string
	repo: IEndpointRepository<TEntity>
	schema: TSchema<TEntity>

	deleteMessage?: string
	columnsBefore?: ColumnsType<TEntity>
	columnsAfter?: ColumnsType<TEntity>

	onAdd?: (() => void) | false
	onDelete?: ((id: number) => Promise<void>) | false
	onEdit?: ((id: number) => void) | false
}

const EntityView: FC<TProps<any>> = ({
	items: _items,
	path,
	repo,
	schema,

	deleteMessage,
	columnsBefore,
	columnsAfter,

	onAdd: _onAdd,
	onDelete: _onDelete,
	onEdit: _onEdit,
}) => {
	const [items, setItems] = useState(_items.map(item => ({...item, key: item.id})));
	const router = useRouter();

	const onAdd = typeof _onAdd === 'undefined' ? () => {
		router.push(`${path}/add`);
	} : _onAdd;

	const onEdit = typeof _onEdit === 'undefined' ? (id: number) => {
		router.push(`${path}/edit/${id}`);
	} : _onEdit;

	const onDelete = typeof _onDelete === 'undefined' ? async (id: number) => {
		try {
			await repo.delete(id);
			setItems(items => items.filter(item => item.id !== id));
			message.success(deleteMessage || 'Элемент удален!');
		} catch (error) {
			message.error((error as Error).message);
		}
	} : _onDelete;

	const getToolbar = () => {
		if (onAdd) {
			return <Toolbar onAdd={onAdd} />;
		}

		return null;
	};

	return (
		<>
			{getToolbar()}
			<EntityTable
				schema={schema}
				items={items}
				onDelete={onDelete}
				onEdit={onEdit}
				columnsBefore={columnsBefore}
				columnsAfter={columnsAfter}
			/>
		</>
	);
};

export {
	EntityView
};