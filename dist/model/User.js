"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Cart_1 = require("./Cart");
class User {
    constructor(nameAccount, password, name, age, email) {
        this._id = 0;
        this._role = 0;
        this._time = 0;
        this._cart = new Cart_1.Cart();
        this._nameAccount = nameAccount;
        this._password = password;
        this._name = name;
        this._age = age;
        this._email = email;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nameAccount() {
        return this._nameAccount;
    }
    set nameAccount(value) {
        this._nameAccount = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get role() {
        return this._role;
    }
    set role(value) {
        this._role = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
    }
    get cart() {
        return this._cart;
    }
    set cart(value) {
        this._cart = value;
    }
    addToCart(t) {
        this._cart.add(t);
    }
    getCart() {
        return this._cart.arrService;
    }
    getTotalMoney() {
        return this._cart.getTotalMoney();
    }
    remove(index) {
        this._cart.remove(index);
    }
    findToCart(index) {
        let service = this._cart.findByIndex(index);
        if (service) {
            return service;
        }
        else {
            return null;
        }
    }
    findByCart(t) {
        let service = this._cart.findByCart(t);
        if (service) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.User = User;
