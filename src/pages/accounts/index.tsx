import { CurrencyFormatter } from '#libs/currency-formatter';
import { ModalCreate } from '#organisms/modal-create-edit';
import { EntityTable } from '#organisms/entity-table';
import { TAccount, TAccountBasicParameters } from '#types/TAccount';
import { Card, message, Row, Col, Statistic, Form } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Toolbar } from '#molecules/toolbar';
import { accountRepo } from '#repositories/endpoints';
import { ArrowDownOutlined, ArrowUpOutlined, CreditCardOutlined } from '@ant-design/icons';
import RemainsStore from '#stores/remains-store';
import { accountSchema } from '#schemas/account-schema';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';

type TProps = {
	accounts: TAccount[]
	parameters: TAccountBasicParameters
}

const Accounts: NextPage<TProps> = ({
	accounts,
	parameters: _parameters,
}: TProps) => {

	const [items, setItems] = useState<TAccount[]>(accounts);
	const [isOpen, setIsOpen] = useState(false);
	const [entity, setEntity] = useState<null | TAccount>(null);
	const [parameters, setParameters] = useState<TAccountBasicParameters>(_parameters);
	const [form] = Form.useForm();

	useEffect(() => {
		(async () => {
			const parameters = await accountRepo.getBasicParameters();
			setParameters(parameters);
			RemainsStore.setRemains(parameters.remains);
		})();
	}, [items]);

	const onChangeOpen = (isOpen: boolean) => {
		setIsOpen(isOpen);
	};

	const onDelete = async (id: number) => {
		try {
			await accountRepo.delete(id);

			setItems(items => {
				message.success('Элемент удален!');
				return items.filter(item => item.id !== id);
			});
		} catch (error) {
			message.error((error as Error).message);
		}
	};

	const onSave = async (values: object) => {
		let id: null | number = null;

		if ('id' in values && values.id) {
			id = +values.id;
			delete values.id;
		}

		const data = Object.fromEntries(
			Object
				.entries(values)
				.filter(([_, value]) => typeof value !== 'undefined' && value !== null)
		) as TAccount;

		try {
			if (id) {
				const item = await accountRepo.update(id, data) as TAccount & { key: number };
				setItems(items => {
					const newItems = items.filter(item => item.id !== id);
					item.key = item.id;
					newItems.push(item);

					setIsOpen(false);
					message.success('Элемент сохранен!');

					return newItems;
				});
			} else {
				const result = await accountRepo.create(data);
				setItems(items => {
					setIsOpen(false);
					message.success('Элемент сохранен!');
					return [
						...items,
						{ ...result, key: result.id }
					];
				});
			}
		} catch (error) {
			message.error((error as Error).message);
		}
	};

	const onEdit = async (id: number) => {
		try {
			const account = await accountRepo.getById(id);

			if (account) {
				setIsOpen(true);
				account.recivied_at = moment(account.recivied_at);
				form.setFieldsValue(account);
				setEntity(account);
			} else {
				throw new Error(`Не удалось получить элемент по id ${id}`);
			}

		} catch (error) {
			message.error((error as Error).message);
		}
	};

	const onAdd = () => {
		setEntity(() => {
			setIsOpen(true);
			setTimeout(() => {
				form.resetFields();
			}, 0);
			return null;
		});
	};

	const columnsAfter: ColumnsType<TAccount> = [
		{
			key: 'income',
			dataIndex: 'income',
			title: 'Доход',
			width: 130,
			render: (_, { sum }) => sum > 0 && (
				<span style={{ color: '#3f8600' }}>
					<ArrowUpOutlined />
					{CurrencyFormatter.format(sum)}
				</span>
			),
		},
		{
			title: 'Расход',
			dataIndex: 'expense',
			key: 'expense',
			width: 130,
			render: (_, { sum }) => sum < 0 && (
				<span style={{ color: '#cf1322' }}>
					<ArrowDownOutlined />
					{CurrencyFormatter.format(Math.abs(sum))}
				</span>
			),
		},
	];

	return (
		<div>
			<Toolbar onAdd={onAdd} />
			<Row gutter={16}>
				<Col span={8}>
					<Card size='small'>
						<Statistic
							title="Доходы"
							value={parameters.incomes}
							precision={1}
							valueStyle={{ color: '#3f8600' }}
							prefix={<ArrowUpOutlined />}
							formatter={value => CurrencyFormatter.format(value as number)}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card size='small'>
						<Statistic
							title="Расходы"
							value={parameters.expenses}
							precision={1}
							valueStyle={{ color: '#cf1322' }}
							prefix={<ArrowDownOutlined />}
							formatter={value => CurrencyFormatter.format(value as number)}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card size='small'>
						<Statistic
							title="Баланс"
							value={parameters.remains}
							precision={1}
							valueStyle={{ color: '#3faa00' }}
							prefix={<CreditCardOutlined />}
							formatter={value => CurrencyFormatter.format(value as number)}
						/>
					</Card>
				</Col>
			</Row>
			<br />
			<EntityTable
				schema={accountSchema}
				items={items}
				columnsAfter={columnsAfter}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
			<ModalCreate
				title="Доходы/расходы"
				schema={accountSchema}
				open={isOpen}
				onChangeOpen={onChangeOpen}
				onSave={onSave}
				form={form}
				entity={entity}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		accounts: [],
		parameters: {
			expenses: 0,
			incomes: 0,
			remains: 0,
		},
	};

	props.accounts = await accountRepo.getMany();
	props.parameters = await accountRepo.getBasicParameters();
	props.accounts = props.accounts.map(account => ({ ...account, key: account.id }));

	return {
		props,
	};
};

export default Accounts;