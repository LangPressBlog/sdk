export interface IDirectusOneModel {
	meta: object;
	data: object;
}

export interface IDirectusManyModel {
	meta: object;
	data: Array<object>;
}

export class DirectusOneModel implements IDirectusOneModel {
	meta: object = {};
	data: any = {};

	constructor(props?: IDirectusOneModel) {
		Object.assign(this, props || {});
	}

	toJSON() {
		return { ...this };
	}
}

export class DirectusManyModel implements IDirectusManyModel {
	meta: object = {};
	data: Array<any> = [];

	constructor(props?: IDirectusOneModel) {
		Object.assign(this, props || {});
	}

	toJSON() {
		return { ...this };
	}
}
