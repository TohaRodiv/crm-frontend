import { FormCreateEdit } from '#organisms/form-create-edit';
import { TSchema } from '#types/TSchema';
import { FormInstance, Modal, ModalFuncProps } from 'antd';
import { FC } from 'react';

type TProps = ModalFuncProps & {
	onChangeOpen: (isOpen: boolean) => void
	onSave: (values: object) => Promise<void>
	schema: TSchema<any>
	form: FormInstance
	entity?: null | {
		[key: string]: any
	}
}

const ModalCreate: FC<TProps> = ({
	schema,
	open,
	title,
	onChangeOpen,
	onSave,
	form,
	entity,
	...modalProps
}) => {

	return (
		<Modal
			title={title}
			okText="Сохранить"
			cancelText="Отмена"
			open={open}
			onOk={() => { form.submit(); }}
			onCancel={() => { onChangeOpen(false); }}
			{...modalProps}>
			<FormCreateEdit schema={schema} onSave={onSave} form={form} entity={entity} />
		</Modal>
	);
};

export {
	ModalCreate
};