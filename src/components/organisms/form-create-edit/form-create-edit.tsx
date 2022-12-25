import { FC } from 'react';
import { Form } from 'antd';
import { FormItem } from './form-item';
import { TSchema } from '#types/TSchema';
import type { FormInstance } from 'antd/es/form';

type TProps<TEntity> = {
	schema: TSchema<TEntity>
	onSave: (values: any) => Promise<void>
	entity?: null | {
		[key: string]: any
	}
	form?: FormInstance
}

const FormCreateEdit: FC<TProps<any>> = ({
	schema,
	entity,
	onSave,
	form,
}) => {

	const onFinish = async (values: object) => {
		try {
			const data =
				Object
					.entries(values)
					.filter(([_, value]) => typeof value !== 'undefined');

			const result = Object.fromEntries(data);
			await onSave(result);
		} catch (error) {
			console.error((error as Error).message);
		}
	};

	return (
		<Form
			form={form}
			onFinish={onFinish}
			autoComplete='off'
			layout='vertical'
			noValidate
		>
			{
				Object
					.entries(schema)
					.map(([key, keySchema]) => {
						return <FormItem
							key={key}
							name={key}
							keySchema={keySchema}
							value={entity ? entity[key] : undefined}
							entity={entity}
						/>;
					})
			}
		</Form>
	);
};

export {
	FormCreateEdit
};