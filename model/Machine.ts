enum status{
    ONLINE = 0,
    OFFLINE = 1
}

export class Machine {
	private _id: number = 0;
    private _name: string;
    private _machineNumber: number;
    private _status: number;
    private _service: string;


	constructor(name: string, machineNumber: number, status: number, service: string) {
		this._name = name;
		this._machineNumber = machineNumber;
		this._service = service;
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

	get machineNumber(): number {
		return this._machineNumber;
	}

	set machineNumber(value: number) {
		this._machineNumber = value;
	}

	get status(): number {
		return this._status;
	}

	set status(value: number) {
		this._status = value;
	}

	get service(): string {
		return this._service;
	}

	set service(value: string) {
		this._service = value;
	}
}