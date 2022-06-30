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
    getTotalMoney() {
        let totalMoney = 0;
        for (let service of this._arrService) {
            totalMoney += (service.price * service.amount);
        }
        return totalMoney;
    }
    findByIndex(index) {
        return this._arrService[index];
    }
    findByCart(t) {
        let service = this._arrService.includes(t);
        if (service) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Cart = Cart;
