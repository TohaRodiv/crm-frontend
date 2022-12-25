import { TAccount, TAccountBasicParameters } from '#types/TAccount';
import { EndpointRepository } from './EndpointRepository';

export class AccountRepository extends EndpointRepository<TAccount> {
	public constructor() {
		super('accounts');
	}

	public async getIncomes(): Promise<number> {
		const result = await this.fetch(`${this.endpoint}/incomes`) as { sum: number };
		return result.sum;
	}

	public async getExpenses(): Promise<number> {
		const result = await this.fetch(`${this.endpoint}/expenses`) as { sum: number };
		return result.sum;
	}

	public async getRamains(): Promise<number> {
		const result = await this.fetch(`${this.endpoint}/remains`) as { sum: number };
		return result.sum;
	}

	public async getBasicParameters(): Promise<TAccountBasicParameters> {
		return await this.fetch(`${this.endpoint}/basic-parameters`) as TAccountBasicParameters;
	}
}