import { Link } from '#atoms/link';
import { Logo } from '#atoms/logo';
import { UserPic } from '#molecules/user-pic';
import { CaretUpOutlined } from '@ant-design/icons';
import { Button, FloatButton, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { menu } from 'src/config/menu';
import styles from './style.module.scss';

const { Header, Content } = Layout;

const AppTemplate: FC<PropsWithChildren> = ({
	children,
}) => {
	const router = useRouter();
	const items = menu.map(({ title, href }) => ({
		key: href,
		label: <Link className='main-menu-link' href={href}>{title}</Link>,
	}));

	return (
		<Layout className={styles.layout}>
			<Header className={styles.header}>
				{/* <Link href='/' className={styles['logo-link']}>
					<Logo />
				</Link> */}
				<Menu
					items={items}
					mode="horizontal"
					theme="dark"
					defaultSelectedKeys={[router.pathname]}
					className={styles.menu}
				/>
				<UserPic />
			</Header>
			<Content className={styles.content}>
				{children}
			</Content>
			<FloatButton.BackTop>
				<Button
					size="large"
					type="default"
					icon={<CaretUpOutlined />} />
			</FloatButton.BackTop>
		</Layout>
	);
};

export {
	AppTemplate
};
