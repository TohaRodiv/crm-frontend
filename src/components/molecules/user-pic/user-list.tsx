import { Link } from '#atoms/link';
import { CurrencyFormatter } from '#libs/currency-formatter';
import remainsStore from '#stores/remains-store';
import { CreditCardOutlined } from '@ant-design/icons';
import { List, Statistic } from 'antd';
import { observer } from 'mobx-react';
import { FC } from 'react';

type TProps = {
	//
}

const UserList: FC<TProps> = observer(() => {
	return (
		<List
			style={{ backgroundColor: '#FFF' }}
			size='small'>
			<List.Item>
				<Statistic
					title={<Link href='/accounts'>Баланс</Link>}
					value={remainsStore.getRemains()}
					precision={1}
					valueStyle={{ color: '#3faa00' }}
					prefix={<CreditCardOutlined />}
					formatter={value => CurrencyFormatter.format(value as number)}
				/>
			</List.Item>
		</List>
	);
});

export {
	UserList
};