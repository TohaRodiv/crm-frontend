import { FormatInputCurrency } from '#libs/format-input-currency';
import { Toolbar } from '#molecules/toolbar';
import { orderRepo } from '#repositories/endpoints';
import { TCart } from '#types/TCart';
import { TOrder } from '#types/TOrder';
import { TStatus } from '#types/TStatus';
import { Form, Input, InputNumber, message, Select } from 'antd';
import { FC } from 'react';
import { CartItems } from './components/cart-items';
import { ClientItem } from './components/client-item';

type TProps = {
	statuses: TStatus[]
}

const AddEditOrder: FC<TProps> = ({
	statuses,
}) => {
	const [form] = Form.useForm();

	const handleFinish = async (order: TOrder) => {
		console.log(order);
		return;
		try {
			await orderRepo.create(order);
			message.success('Заказ создан!');
		} catch (error) {
			message.error((error as Error).message);
		}
	};

	const handleChangeSum = () => {
		const carts = form.getFieldValue('carts') as TCart[];

		if (carts) {
			const sum = carts.reduce((prev, current) => (current && current.sum) ? prev + current.sum : prev, 0);
			form.setFieldsValue({ sum });
		} else {
			form.setFieldsValue({ sum: 0 });
		}
	};

	return (
		<>
			<Toolbar onSave={() => form.submit()} onSaveAndClose={() => null} onCancel={() => null} />
			<Form form={form} layout='vertical' onFinish={handleFinish}>
				<ClientItem form={form} />

				<CartItems form={form} onSumChange={handleChangeSum} />

				<Form.Item name='sum' rules={[{ required: true, message: 'Итог не заполнен' }]} label='Итог'>
					<InputNumber
						addonAfter='₽'
						style={{ width: 130 }}
						formatter={FormatInputCurrency}
					/>
				</Form.Item>

				<Form.Item name='status' label='Статус' rules={[{ required: true }]}>
					<Select options={statuses.map(status => ({ label: status.title, value: status.id }))} />
				</Form.Item>

				<Form.Item name='comment' label='Комментарий'>
					<Input.TextArea showCount allowClear />
				</Form.Item>
			</Form>
		</>
	);
};

export {
	AddEditOrder
};