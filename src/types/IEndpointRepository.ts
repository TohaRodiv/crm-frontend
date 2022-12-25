export interface IEndpointRepository<TEntity> {
	getMany(): Promise<TEntity[]>;

	getById(id: number): Promise<TEntity | null>;

	create(entity: TEntity): Promise<TEntity>;

	createMany(entities: TEntity[]): Promise<TEntity[]>;

	update(id: number, entity: TEntity): Promise<TEntity>;

	delete(id: number): Promise<void>;
}