import {Service} from "./Service";

export class Cart {
    private _totalMoney: number = 0
    private _arrService: Service[] = [];

    constructor() {
    }

    get totalMoney(): number {
        return this._totalMoney;
    }

    set totalMoney(value: number) {
        this._totalMoney = value;
    }

    get arrService(): Service[] {
        return this._arrService;
    }

    set arrService(value: Service[]) {
        this._arrService = value;
    }

    add(t: Service): void {
        this._arrService.push(t);
    }

    findByName(name: string): number | null{
        let current = true;
        let index = -1;
        for (let i = 0; i < this._arrService.length; i++) {
            if (name == this._arrService[i].name) {
                index = i;
                current = true;
                break;
            }
        }
        if (current){
            return index;
        }else {
            return null;
        }
    }

    remove(i: number) {
        this._arrService.splice(i, 1);
    }

    getTotalMoney(): number {
        let totalMoney: number = 0;
        for (let service of this._arrService) {
            totalMoney += (service.price * service.amount)
        }
        return totalMoney;
    }
}