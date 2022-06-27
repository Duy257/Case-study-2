"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuAdmin = void 0;
const ServiceManager_1 = require("../management/service/ServiceManager");
class MenuAdmin {
    constructor() {
        this.serviceManager = new ServiceManager_1.ServiceManager();
    }
}
exports.MenuAdmin = MenuAdmin;
