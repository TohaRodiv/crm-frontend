import { TCart } from '#types/TCart';
import { TOrder } from '#types/TOrder';
import { TProduct } from '#types/TProduct';
import { TStatus } from '#types/TStatus';
import { TUser } from '#types/TUser';
import { AccountRepository } from './AccountRepository';
import { EndpointRepository } from './EndpointRepository';

export const accountRepo = new AccountRepository();
export const userRepo = new EndpointRepository<TUser>('users');
export const orderRepo = new EndpointRepository<TOrder>('orders');
export const statusRepo = new EndpointRepository<TStatus>('statuses');
export const productRepo = new EndpointRepository<TProduct>('products');
export const cartRepo = new EndpointRepository<TCart>('carts');