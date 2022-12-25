import { IEndpointRepository } from '#types/IEndpointRepository';
import { message, Select } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';

type TProps<TEntity> = {
	repo: IEndpointRepository<TEntity>
	renderLabel?: (item: TEntity) => string | ReactNode
}

const ManyToMany: FC<TProps<any>> = ({
	repo,
	renderLabel,
	...props
}) => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const result = await repo.getMany();
				setItems(() => {
					setLoading(false);
					return result.map(item => ({
						value: item.id,
						label: renderLabel ? renderLabel(item) : item.name || item.title || item.id,
					})) as never[];
				});
			} catch (error) {
				message.error((error as Error).message);
			}
		})();
	}, []);

	return (
		<Select
			options={items}
			loading={loading}
			mode='multiple'
			{...props}
		/>
	);
};

export {
	ManyToMany
};