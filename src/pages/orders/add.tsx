import { AddEditOrder } from '#pages/orders';
import { GetServerSideProps, NextPage } from 'next';
import { TStatus } from '#types/TStatus';
import { statusRepo } from '#repositories/endpoints';

type TProps = {
	statuses: TStatus[]
}

const OrderAdd: NextPage<TProps> = ({
	statuses
}) => {
	return <AddEditOrder statuses={statuses} />;
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