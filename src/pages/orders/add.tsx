import { AddEditOrder } from '#organisms/orders';
import { GetServerSideProps, NextPage } from 'next';
import { TStatus } from '#types/TStatus';
import { statusRepo } from '#repositories/endpoints';

type TProps = {
	statuses: TStatus[]
}

const OrderAdd: NextPage<TProps> = ({
	statuses
}) => {
	return <AddEditOrder statuses={statuses} path='/orders' />;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const props: TProps = {
		statuses: [],
	};

	try {
		props.statuses = await statusRepo.getMany();
	} catch (e) {
		console.error((e as Error).message);
	}

	return {
		props
	};
};

export default OrderAdd;