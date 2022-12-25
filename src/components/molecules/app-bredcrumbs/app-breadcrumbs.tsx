import { Breadcrumb } from 'antd';
import { FC } from 'react';

const AppBreadcrumbs: FC = () => {
	return (
		<Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
	);
};

export {
	AppBreadcrumbs
};