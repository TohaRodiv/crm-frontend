import { action, makeAutoObservable } from 'mobx';

class RemainsStore {
	private remains = 0;

	public constructor () {
		makeAutoObservable(this);
	}

	@action
	public setRemains(remains: number) {
		this.remains = remains;
	}

	public getRemains(): number {
		return this.remains;
	}
}

export default new RemainsStore;