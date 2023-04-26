import { TProduct } from '#types/TProduct';
import { TStatus } from '#types/TStatus';
import { TUser } from '#types/TUser';
import { AccountRepository } from './AccountRepository';
import { EndpointRepository } from './EndpointRepository';
import { OrderRepository } from './OrderRepository';

export const orderRepo = new OrderRepository();
export const accountRepo = new AccountRepository();
export const userRepo = new EndpointRepository<TUser>('users');
export const statusRepo = new EndpointRepository<TStatus>('statuses');
export const productRepo = new EndpointRepository<TProduct>('products');