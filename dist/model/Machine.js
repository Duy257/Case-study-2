"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
var status;
(function (status) {
    status[status["ONLINE"] = 0] = "ONLINE";
    status[status["OFFLINE"] = 1] = "OFFLINE";
})(status || (status = {}));
class Machine {
    constructor(name, machineNumber, status, service) {
        this._id = 0;
        this._name = name;
        this._machineNumber = machineNumber;
        this._service = service;
        this._status = status;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get machineNumber() {
        return this._machineNumber;
    }
    set machineNumber(value) {
        this._machineNumber = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get service() {
        return this._service;
    }
    set service(value) {
        this._service = value;
    }
}
exports.Machine = Machine;
