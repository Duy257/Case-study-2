enum status{
    ONLINE = 0,
    OFFLINE = 1
}

export class Machine {
	private _id: number = 0;
    private _name: string;
    private _status: number;

	constructor(name: string, status: number) {
		this._name = name;
		this._status = status;
	}

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get status(): number {
		return this._status;
	}

	set status(value: number) {
		this._status = value;
	}
}