"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const User_1 = require("../../model/User");
const Role_1 = require("../../model/Role");
class UserManager {
    constructor() {
        let admin = new User_1.User('admin', '123456', 'ADMIN', 20, 'duy@gmail.com');
        admin.id = UserManager.id;
        admin.role = Role_1.role.ADMIN;
        UserManager.arr.push(admin);
    }
    getAll() {
        return UserManager.arr;
    }
    add(t) {
        UserManager.id++;
        t.id = UserManager.id;
        t.role = Role_1.role.USER;
        UserManager.arr.push(t);
    }
    delete(id) {
        let index = this.findById(id);
        if (index != -1)
            UserManager.arr.splice(index, 1);
    }
    ;
    findById(id) {
        let index = -1;
        for (let i = 0; i < UserManager.arr.length; i++) {
            if (UserManager.arr[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findByNameAccount(nameAccount) {
        for (let user of UserManager.arr) {
            if (nameAccount == user.nameAccount) {
                return user;
                break;
            }
        }
        return null;
    }
    findByPassword(passWord) {
        for (let user of UserManager.arr) {
            if (passWord == user.password) {
                return user;
                break;
            }
        }
        return null;
    }
    findByEmail(email) {
        for (let user of UserManager.arr) {
            if (email == user.email) {
                return user;
                break;
            }
        }
        return null;
    }
    login(nameAccount, password) {
        for (let user of UserManager.arr) {
            if (nameAccount == user.nameAccount && password == user.password) {
                return user;
            }
        }
        return null;
    }
}
exports.UserManager = UserManager;
UserManager.arr = [];
UserManager.id = 1;
