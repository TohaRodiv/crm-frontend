import { CurrencyFormatter } from '#libs/currency-formatter';
import { DateFormatter } from '#libs/date-formatter';
import { TSchema } from '#types/TSchema';
import { Button, Popconfirm, Space, Switch, Table, Tooltip } from 'antd';
import { FC } from 'react';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType, ColumnType } from 'antd/es/table';

type TProps = {
	items: RcTableProps<any>['data']
	schema: TSchema<any>

	columnsBefore?: ColumnsType<any>
	columnsAfter?: ColumnsType<any>

	onDelete?: ((id: number) => Promise<void>) | false
	onEdit?: ((id: number) => void) | false
	onSelect?: (item: any) => void
}

const EntityTable: FC<TProps> = ({
	items,
	schema,
	columnsBefore,
	columnsAfter,
	onDelete,
	onEdit,
	onSelect,
}) => {

	const columns: ColumnsType<any> = Object
		.entries(schema)
		.filter(([_, { display }]) => display !== false)
		.map(([key, keySchema]) => {
			const result: ColumnType<any> = {
				dataIndex: key,
				key,
				...keySchema
			};

			switch (keySchema.type) {
				case 'date':
					result.render = value => DateFormatter.format(value);
					break;

				case 'date-time':
					result.render = value => DateFormatter.format(value, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
					});
					break;

				case 'number':
					if (keySchema.format === 'currency') {
						result.render = value => CurrencyFormatter.format(value);
					}
					break;

				case 'boolean':
					if (keySchema.format === 'switch') {
						result.render = value => <Switch defaultChecked={!!value} disabled={true} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />;
					} else {
						result.render = value => value === true ? 'Да' : 'Нет';
					}

					break;
			}

			return result;
		});


	let columnsResult: ColumnsType<any> = [];

	if (onDelete || onEdit || onSelect) {
		columnsResult.push(
			{
				title: 'Действие',
				dataIndex: '_action',
				key: '_action',
				width: 100,
				render: (_: any, item) => {
					const { id } = item;

					if (typeof id !== 'number') {
						throw new Error('Неверный тип id элемента!');
					}

					return (
						<Space size={0}>
							{
								onSelect && (
									<Tooltip title='Выбрать'>
										<Button icon={<CheckOutlined />} type='link' size='small' onClick={() => onSelect(item)} />
									</Tooltip>
								)
							}
							{
								onDelete && (
									<Tooltip title='Удалить'>
										<Popconfirm title='Удалить?' onConfirm={() => onDelete(id)} okText='Да' cancelText='Отмена'>
											<Button type='link' size='small' icon={<DeleteOutlined />} />
										</Popconfirm>
									</Tooltip>
								)
							}
							{
								onEdit && (
									<Tooltip title='Изменить'>
										<Button type='link' onClick={() => { onEdit(id); }} size='small' icon={<EditOutlined />} />
									</Tooltip>
								)
							}
						</Space >
					);
				},
			}
		);
	}

	columnsBefore && (columnsResult = columnsBefore);
	columnsResult = [...columnsResult, ...columns];
	columnsAfter && (columnsResult = [...columnsResult, ...columnsAfter]);

	return (
		<Table dataSource={items} columns={columnsResult} />
	);
};

export {
	EntityTable
};