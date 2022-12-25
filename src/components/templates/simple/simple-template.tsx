import React, { FC, PropsWithChildren } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import { BackTop, Button, ConfigProvider, Menu, } from 'antd';
import { Link } from '#atoms/link';
import { menu } from 'src/config/menu';

const SimpleTemplate: FC<PropsWithChildren> = ({
	children,
}) => {
	const items = menu.map(item => ({
		key: item.href,
		label: <Link href={item.href}>{item.title}</Link>,
	}));

	return (
		<ConfigProvider>
			<Menu items={items} mode="horizontal" />
			<div style={{ padding: 15 }}>
				{children}
			</div>
			<BackTop>
				<Button
					size="large"
					type="default"
					icon={<CaretUpOutlined />} />
			</BackTop>
		</ConfigProvider>
	);
};

export {
	SimpleTemplate
};