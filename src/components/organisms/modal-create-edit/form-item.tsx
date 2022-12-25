import { TKeySchema, TSchemaKeyType } from '#types/TSchema';
import { Form, DatePicker, InputNumber, Input, } from 'antd';
import { FC } from 'react';

const { TextArea } = Input;

type TProps = {
	keySchema: TKeySchema
	name: string
	value?: any
}

const FormItem: FC<TProps> = ({
	keySchema,
	name,
	value,
}) => {
	const { title, required, type, defaultValue, } = keySchema;
	let initialValue: unknown = null;

	if (type === 'primary-key') {
		return null;
	}

	const createField = (type: TSchemaKeyType) => {
		switch (type) {
			case 'string':
				return <Input />;

			case 'textarea':
				return <TextArea />;

			case 'number':
				return <InputNumber />;

			case 'date':
				return <DatePicker format='DD MMM YY' />;
		}
	};

	if (typeof value !== 'undefined') {
		initialValue = value;
	} else {
		initialValue = typeof defaultValue === 'undefined' ? undefined : defaultValue;
	}

	return (
		<Form.Item
			label={title}
			name={name}
			rules={[{ required: !!required, message: 'Поле не должно быть пустым!' }]}
			initialValue={initialValue}
			colon={false}
			shouldUpdate
		>
			{createField(type)}
		</Form.Item>
	);
};

export {
	FormItem
};