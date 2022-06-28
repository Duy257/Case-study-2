export class Service {
    private _id: number = 0;
    private _name: string;
    private _price: number;
    private _amount: number = 0; 


    constructor(name: string, price: number) {
        this._name = name;
        this._price = price;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}