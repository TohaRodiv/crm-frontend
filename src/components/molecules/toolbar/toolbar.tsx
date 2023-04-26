import { CloseOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { FC, ReactNode } from 'react';

type TProps = {
	onAdd?: (() => void) | false
	onCancel?: (() => void) | false
	onSave?: (() => void) | false
	onSaveAndClose?: (() => void) | false
	withoutDivider?: boolean
	children?: ReactNode
}

const Toolbar: FC<TProps> = ({
	onAdd,
	onCancel,
	onSave,
	onSaveAndClose,
	withoutDivider,
	children,
}) => {
	return (
		<>
			<Space wrap={true}>
				{
					onAdd && (
						<Button onClick={() => { onAdd(); }} type='primary' ghost>
							<PlusOutlined />
							Добавить
						</Button>
					)
				}
				{
					onSaveAndClose && (
						<Button onClick={() => { onSaveAndClose(); }} type='primary' ghost>
							<SaveOutlined />
							Сохранить и закрыть
						</Button>
					)
				}
				{
					onSave && (
						<Button onClick={() => { onSave(); }} type='primary' ghost>
							<SaveOutlined />
							Сохранить
						</Button>
					)
				}
				{
					onCancel && (
						<Button onClick={() => { onCancel(); }}>
							<CloseOutlined />
							Закрыть
						</Button>
					)
				}
				{children}
			</Space>

			{
				!withoutDivider && (
					<Divider />
				)
			}
		</>
	);
};

Toolbar.defaultProps = {
	withoutDivider: false,
};

export {
	Toolbar
};