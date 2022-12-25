import { TKeySchema, } from '#types/TSchema';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormItemProps, Space } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import moment from 'moment';
import { FC } from 'react';
import { createField } from './create-field';
import { createRelation } from './create-relation';

type TProps = FormItemProps & {
	keySchema: TKeySchema
	name: NamePath
	value?: any
	entity?: null | {
		[key: string]: any
	}
}

const FormItem: FC<TProps> = ({
	keySchema,
	name,
	value,
	entity,
	...props
}) => {
	const {
		title,
		required,
		type,
		format,
		defaultValue,
		edit,
		repo,
		renderLabel,
		schema,
		hidden,
	} = keySchema;
	let initialValue: any = null;

	if (type === 'primary-key' && !value) {
		return null;
	}

	if (edit === false) {
		return null;
	}

	if (type === 'relation' && !format && !repo) {
		throw new Error('Для связи не указаны обязательные параметры: format или repo');
	}

	if (type === 'relation' && format === 'one-to-many' && !schema) {
		throw new Error('Для связи один ко многим не указана схема!');
	}

	if (typeof value !== 'undefined') {
		switch (type) {
			case 'date':
			case 'date-time':
				initialValue = moment(value);
				break;

			case 'relation':
				if (format === 'one-to-many') {
					if (value) {
						initialValue = value.map((item: { [key: string]: any }) => {
							return Object.fromEntries(Object
								.entries(item)
								.map(([key, keyValue]) => {
									let value = keyValue;

									if (typeof value === 'object' && 'id' in value) {
										value = keyValue.id;
									}

									return [
										key, value
									];
								})
							);
						});
					}
				} else {
					if (Array.isArray(value)) {
						initialValue = value.map((item: { id: number }) => item.id);
					} else if (typeof value === 'object') {
						if (!('id' in value)) {
							// TODO
							// throw new Error(`Не хватает аттрибута id в поле ${name}`);
						} else {
							initialValue = value.id;
						}
					} else {
						initialValue = value;
					}
				}

				break;

			default:
				initialValue = value;
		}

	} else {
		initialValue = typeof defaultValue === 'undefined' ? undefined : defaultValue;
	}

	const createSubItem = () => {
		if (!schema) {
			throw new Error(`Схема не была передана в поле ${name}`);
		}
		const defaultValue = Object
			.entries(schema)
			.map(([key, { referenceField, defaultValue: _defaultValue }]) => {
				let defaultValue = _defaultValue;

				if (referenceField && entity) {
					defaultValue = entity[referenceField];
				}

				return [key, defaultValue];
			});

		return Object.fromEntries(defaultValue);
	};

	const renderEasyItem = () => {
		return (
			<Form.Item
				label={title}
				name={name}
				rules={[{ required: !!required, message: 'Поле не должно быть пустым!' }]}
				colon={false}
				initialValue={initialValue}
				hidden={type === 'primary-key' || hidden}
				valuePropName={type === 'boolean' ? 'checked' : 'value'}
				{...props}
			>
				{
					(type === 'relation' && format && repo) ? hidden ? createField('number') : createRelation(format, repo, renderLabel) : createField(type)
				}
			</Form.Item>
		);
	};

	const renderOneToManyRelation = () => (
		<Form.List
			name={name}
			initialValue={(initialValue || []) as any[]}
		>
			{
				(fields, { add, remove }) => {
					return (
						<>
							{
								fields.map(({ key, name: fieldName, ...restFields }, index) => (
									<Space key={key} style={{ display: 'flex' }}>
										{
											schema && Object
												.entries(schema)
												.map(([key, keySchema]) => {
													const value = !initialValue ? undefined : typeof initialValue[index] === 'undefined' ? undefined : initialValue[index][key];
													return <FormItem
														key={key}
														name={[fieldName, key]}
														keySchema={keySchema}
														value={value}
														entity={entity}
														{...restFields}
													/>;
												})
										}
										<MinusCircleOutlined onClick={() => remove(fieldName)} />
									</Space>
								))
							}

							<Form.Item>
								<Button
									onClick={() => { add(createSubItem()); }}
									icon={<PlusOutlined />}
								>
									Добавить
								</Button>
							</Form.Item>
						</>
					);
				}
			}
		</Form.List>
	);

	return (
		type === 'relation' && format === 'one-to-many' ? renderOneToManyRelation() : renderEasyItem()
	);
};

export {
	FormItem
};