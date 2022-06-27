"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    constructor() {
        this._totalMoney = 0;
        this._arrService = [];
    }
    get totalMoney() {
        return this._totalMoney;
    }
    set totalMoney(value) {
        this._totalMoney = value;
    }
    get arrService() {
        return this._arrService;
    }
    set arrService(value) {
        this._arrService = value;
    }
    add(t) {
        this._totalMoney += t.price;
        this._arrService.push(t);
    }
    findByName(name) {
        let current = true;
        let index = -1;
        for (let i = 0; i < this._arrService.length; i++) {
            if (name == this._arrService[i].name) {
                index = i;
                current = true;
                break;
            }
        }
        if (current) {
            return index;
        }
        else {
            return null;
        }
    }
    remove(i) {
        this._arrService.splice(i, 1);
    }
}
exports.Cart = Cart;
