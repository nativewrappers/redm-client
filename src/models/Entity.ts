
export class Entity {
	private handle: number;
	constructor(entHandle: number) {
		this.handle = entHandle;
	}

	get Handle(): number {
		return this.handle;
	}
}