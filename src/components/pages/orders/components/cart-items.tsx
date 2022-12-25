
import { FormatInputCurrency } from '#libs/format-input-currency';
import { productRepo } from '#repositories/endpoints';
import { TCart } from '#types/TCart';
import { TProduct } from '#types/TProduct';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, InputNumber, message, Select, Space } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { FC, useEffect, useState } from 'react';

type TProps = {
	form: FormInstance
	onSumChange: () => void
}

let products: TProduct[] = [];

const calcProductSum = (form: FormInstance, index: number, onSumChange: () => void) => {
	const carts = (form.getFieldValue('carts') as TCart[]);
	const cart = carts[index];

	let sum = cart.price * cart.count;

	if (!isFinite(sum)) {
		sum = 0;
	}

	cart.sum = sum;

	form.setFieldsValue({ carts });
	onSumChange();
};

const CartItems: FC<TProps> = ({
	form,
	onSumChange,
}) => {

	const [productOptions, setProductOptions] = useState<BaseOptionType[]>([]);

	const handleChangeProduct = (productId: number, index: number) => {
		const carts = (form.getFieldValue('carts') as TCart[]);
		const cart = carts[index];
		const product = products.filter(product => product.id === productId)[0];

		cart.count = 1;
		cart.price = product ? product.price : 0;
		cart.sum = cart.price * cart.count;

		form.setFieldsValue({ carts });
		onSumChange();
	};


	useEffect(() => {

		(async () => {
			try {
				products = await productRepo.getMany();
				const options = products.map(product => ({
					label: product.name,
					value: product.id,
				}));

				setProductOptions(options);
			} catch (error) {
				message.error((error as Error).message);
			}
		})();

		return () => {
			setProductOptions([]);
		};
	}, []);

	return (
		<Form.List name='carts'>
			{
				(fields, { add, remove }) => (
					<>
						<Form.Item>
							<Button icon={<FileAddOutlined />} onClick={() => { add(); onSumChange(); }}>Добавить</Button>
						</Form.Item>
						{
							fields.map(({ key, name, ...restField }) => (
								<Space key={key} style={{ display: 'flex' }} align='baseline'>
									<Form.Item
										{...restField}
										name={[name, 'product']}
										label='Товар'>
										<Select
											style={{ width: 250 }}
											options={productOptions}
											optionFilterProp='label'
											onChange={(productId: number) => handleChangeProduct(productId, name)}
											showSearch
											allowClear
										/>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'count']}
										label='Кол-во'>
										<InputNumber
											min={1}
											onChange={() => calcProductSum(form, name, onSumChange)}
											addonAfter='шт'
											style={{ width: 130 }}
										/>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'price']}
										label='Цена'
										tooltip='Цена за ед.'>
										<InputNumber
											min={1}
											onChange={() => calcProductSum(form, name, onSumChange)}
											addonAfter='₽'
											formatter={FormatInputCurrency}
											style={{ width: 130 }}
										/>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'sum']}
										label='Сумма'
										tooltip='Сумма с учетом кол-ва'>
										<InputNumber
											min={1}
											onChange={() => onSumChange()}
											addonAfter='₽'
											formatter={FormatInputCurrency}
											style={{ width: 130 }}
										/>
									</Form.Item>
									<Form.Item label=' '>
										<Button icon={<DeleteOutlined />} onClick={() => { remove(name); onSumChange(); }} />
									</Form.Item>
								</Space>
							))
						}
					</>
				)
			}
		</Form.List>
	);
};

export {
	CartItems
};