import { TOrder } from '#types/TOrder';
import { EndpointRepository } from './EndpointRepository';

export class OrderRepository extends EndpointRepository<TOrder> {
	public constructor() {
		super('orders');
	}

	public async create(order: TOrder): Promise<TOrder> {
		order.products = order.products.map(id => ({ id })) as any;

		return await super.create(order);
	}

	public async createMany(orders: TOrder[]): Promise<TOrder[]> {
		const newOrders = orders.map(order => ({ ...order, products: order.products.map(id => ({ id })) as any }));

		return await super.createMany(newOrders);
	}

	public async update(id: number, order: TOrder): Promise<TOrder> {
		order.products = order.products.map(id => ({ id })) as any;

		return await super.update(id, order);
	}
}