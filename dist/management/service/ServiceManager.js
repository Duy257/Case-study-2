"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = void 0;
const Service_1 = require("../../model/Service");
class ServiceManager {
    constructor() {
        ServiceManager.arr.push(new Service_1.Service('Mì trứng', 20000));
    }
    getAll() {
        return ServiceManager.arr;
    }
    add(t) {
        ServiceManager.id++;
        t.id = ServiceManager.id;
        ServiceManager.arr.push(t);
    }
    remove(id) {
        for (let i = 0; i < ServiceManager.arr.length; i++) {
            if (id == ServiceManager.arr[i].id) {
                ServiceManager.arr.splice(i, 1);
            }
        }
    }
    findByName(name) {
        for (let service of ServiceManager.arr) {
            if (name == service.name) {
                return service;
                break;
            }
        }
        return null;
    }
    FindByIndex(index) {
        for (let i = 0; i < ServiceManager.arr.length; i++) {
            return ServiceManager.arr[index];
        }
        return null;
    }
    ;
}
exports.ServiceManager = ServiceManager;
ServiceManager.arr = [];
ServiceManager.id = 0;
