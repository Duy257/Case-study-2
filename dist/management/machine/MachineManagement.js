"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineManagement = void 0;
const Machine_1 = require("../../model/Machine");
class MachineManagement {
    constructor() {
        this.arr = [];
        this.id = 0;
        let may1 = new Machine_1.Machine('may1', 1);
    }
    getAll() {
        return this.arr;
    }
    add(t) {
        this.id++;
        t.id = this.id;
        this.arr.push(t);
        console.log('Thêm thành công');
    }
    ;
    remove(id) {
        for (let i = 0; i < this.arr.length; i++) {
            if (id == this.arr[i].id) {
                this.arr.splice(i, 1);
            }
        }
    }
    convertStatus(name) {
        let machine = this.findByName(name);
        if (machine) {
            if (machine.status == 0) {
                machine.status = 1;
            }
            else {
                machine.status = 0;
            }
        }
        else {
            console.log('Không tìm thấy máy!');
        }
    }
    findByName(name) {
        for (let machine of this.arr) {
            if (name == machine.name) {
                return machine;
                break;
            }
        }
        return null;
    }
}
exports.MachineManagement = MachineManagement;
