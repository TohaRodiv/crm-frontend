import { IEndpointRepository } from '#types/IEndpointRepository';

export class EndpointRepository<TEntity> implements IEndpointRepository<TEntity> {
	/**
	 * TODO: Вынести apiUrl в config
	 */
	protected apiUrl = 'http://localhost';

	public constructor(
		protected endpoint: string,
	) { }

	public async getMany(): Promise<TEntity[]> {
		return await this.requestToEndpoint();
	}

	public async getById(id: number): Promise<TEntity | null> {
		return await this.requestToEndpoint(id);
	}

	public async create(entity: TEntity): Promise<TEntity> {
		return await this.requestToEndpoint('', {
			body: JSON.stringify(entity),
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	public async createMany(entities: TEntity[]): Promise<TEntity[]> {
		return await this.requestToEndpoint('bulk', {
			body: JSON.stringify({bulk: entities}),
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	public async update(id: number, entity: TEntity): Promise<TEntity> {
		return await this.requestToEndpoint(id, {
			body: JSON.stringify(entity),
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	public async delete(id: number): Promise<void> {
		return await this.requestToEndpoint(id, {
			method: 'DELETE',
		});
	}

	protected async requestToEndpoint(input: string | number = '', init?: RequestInit): Promise<any> {
		return await this.fetch(`${this.endpoint}/${input}`, init);
	}

	protected async fetch(input: string, init?: RequestInit): Promise<object> {
		const response = await fetch(`${this.apiUrl}/${input}`, init);

		if (!response.ok) {
			throw new Error(`${response.url}: ${response.statusText} ${response.status}`);
		}

		return await response.json();
	}
}