import { Toolbar } from '#molecules/toolbar';
import { FormCreateEdit } from '#organisms/form-create-edit';
import { IEndpointRepository } from '#types/IEndpointRepository';
import { TProduct } from '#types/TProduct';
import { TSchema } from '#types/TSchema';
import { Form, message } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';

type TProps<TEntity> = {
	path: string
	repo: IEndpointRepository<TEntity>
	schema: TSchema<TEntity>

	entity?: TEntity
	saveMessage?: string
}

const EntityCreateEdit: FC<TProps<any>> = ({
	path,
	repo,
	schema,

	entity,
	saveMessage,
}) => {
	const router = useRouter();
	const [form] = Form.useForm();
	let isClose = false;

	const onSave = async (values: { [key: string]: any }) => {
		const id = +values.id;

		try {
			if (isFinite(id)) {
				await repo.update(id, values);
			} else {
				delete values.id;
				await repo.create(values as TProduct);
				form.resetFields();
			}

			message.success(saveMessage || 'Элемент сохранен!');
			isClose && router.replace(path);
		} catch (error) {
			message.error((error as Error).message);
		}
	};

	const onSubmit = () => {
		isClose = false;
		form.submit();
	};

	const onSubmitAndClose = async () => {
		isClose = true;
		form.submit();
	};

	const onCancel = () => {
		router.replace(path);
	};

	return (
		<>
			<Toolbar onCancel={onCancel} onSaveAndClose={onSubmitAndClose} onSave={onSubmit} />
			<FormCreateEdit
				schema={schema}
				onSave={onSave}
				form={form}
				entity={entity}
			/>
		</>
	);
};

export {
	EntityCreateEdit
};