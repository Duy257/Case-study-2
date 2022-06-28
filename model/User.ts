import {Cart} from "./Cart";
import {Service} from "./Service";

export class User {
    private _id: number = 0;
    private _nameAccount: string;
    private _password: string;
    private _name: string;
    private _age: number;
    private _email: string;
    private _role: number = 0;
    private _time: number = 0;
    private _cart = new Cart()
    private idCart: number = 0;


    constructor(nameAccount: string, password: string, name: string, age: number, email: string) {
        this._nameAccount = nameAccount;
        this._password = password;
        this._name = name;
        this._age = age;
        this._email = email;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nameAccount(): string {
        return this._nameAccount;
    }

    set nameAccount(value: string) {
        this._nameAccount = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get role(): number {
        return this._role;
    }

    set role(value: number) {
        this._role = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get time(): number {
        return this._time;
    }

    set time(value: number) {
        this._time = value;
    }

    get cart(): Cart {
        return this._cart;
    }

    set cart(value: Cart) {
        this._cart = value;
    }

    addToCart(t: Service) {
        let id = this.idCart++;
        t.id = id;
        this._cart.add(t);
    }

}