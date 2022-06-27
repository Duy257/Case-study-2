import {Machine} from "../../model/Machine";
import {Service} from "../../model/Service";

export class MachineManagement {
    private arr: Machine[] = [];
    private id: number = 0;

    constructor() {
        let may1 = new Machine('may1', 1);
    }

    getAll() {
        return this.arr;
    }

    add(t: Machine) {
        this.id++;
        t.id = this.id;
        this.arr.push(t);
        console.log('Thêm thành công')
    };

    remove(id: number) {
        for(let i = 0; i < this.arr.length; i++) {
            if(id == this.arr[i].id) {
                this.arr.splice(i, 1)
            }
        }
    }

    convertStatus(name: string) {
        let machine = this.findByName(name);
        if(machine) {
            if(machine.status == 0) {
                machine.status = 1;
            }else {
                machine.status = 0;
            }
        }else {
            console.log('Không tìm thấy máy!')
        }
    }

    findByName(name: string): Machine | null {
        for (let machine of this.arr) {
            if (name == machine.name) {
                return machine
                break;
            }
        }
        return null;
    }

}