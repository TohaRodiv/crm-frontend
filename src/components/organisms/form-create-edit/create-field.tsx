import { TSchemaKeyType } from '#types/TSchema';
import { Input, InputNumber, DatePicker, Switch } from 'antd';

const { TextArea } = Input;

export const createField = (type: TSchemaKeyType) => {
	switch (type) {
		case 'primary-key':
			return <Input type='hidden' />;

		case 'string':
			return <Input />;

		case 'textarea':
			return <TextArea />;

		case 'number':
			return <InputNumber />;

		case 'date':
			return <DatePicker format='DD MMM YY' />;

		case 'boolean':
			return <Switch checkedChildren='Да' unCheckedChildren='Нет' />;

		default:
			return 'Не удалось определить тип поля!';
	}
};