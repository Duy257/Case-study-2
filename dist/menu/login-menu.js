"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMenu = void 0;
const UserManager_1 = require("../management/user/UserManager");
const rl = __importStar(require("readline-sync"));
const User_1 = require("../model/User");
const Role_1 = require("../model/Role");
const ServiceManager_1 = require("../management/service/ServiceManager");
const Service_1 = require("../model/Service");
const Cart_1 = require("../model/Cart");
const MachineManagement_1 = require("../management/machine/MachineManagement");
// import {ReadFileAccount} from "../model/ReadFileAccount";
var LoginChoice;
(function (LoginChoice) {
    LoginChoice[LoginChoice["LOGIN"] = 1] = "LOGIN";
    LoginChoice[LoginChoice["REGISTER"] = 2] = "REGISTER";
})(LoginChoice || (LoginChoice = {}));
class LoginMenu {
    constructor() {
        this.userManager = new UserManager_1.UserManager();
        this.serviceManager = new ServiceManager_1.ServiceManager();
        this.machine = new MachineManagement_1.MachineManagement();
    }
    // private readToFileAccount = new ReadFileAccount();
    run() {
        let choice = -1;
        do {
            console.log('---Ch??o m???ng ?????n v???i net Duy Nguy???n---');
            console.log('1. ????ng nh???p');
            console.log('2. ????ng k??');
            console.log('0. Tho??t');
            choice = +rl.question('Nh???p l???a ch???n c???a b???n: ');
            switch (choice) {
                case LoginChoice.LOGIN: {
                    console.log('---????ng nh???p---');
                    this.loginForm();
                    break;
                }
                case LoginChoice.REGISTER: {
                    console.log('---????ng k?? t??i kho???n---');
                    this.registerForm();
                    break;
                }
            }
        } while (choice != 0);
    }
    //Open ????ng k??
    registerForm() {
        let user = this.iputUser();
        if (user != null) {
            this.userManager.add(user);
            // this.readToFileAccount.writeToFile(user);
            console.log('????ng k?? th??nh c??ng!');
        }
        else {
            console.log('????ng k?? th???t b???i!');
        }
    }
    iputUser() {
        let userName = this.inputUserName();
        let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let passWord = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(passWord);
        let name = rl.question('Nh???p t??n c???a b???n: ');
        let age = this.inputAge();
        if (age < 18) {
            console.log('B???n ch??a ????? tu???i ??i n??t!');
            return null;
        }
        let email = this.inputEmail();
        return new User_1.User(userName, passWord, name, age, email);
    }
    // nh???p t??n
    inputUserName() {
        let userName = '';
        let isValidUserName = true;
        do {
            userName = rl.question('Nh???p t??n: ');
            let currentUser = this.userManager.findByNameAccount(userName);
            if (currentUser) {
                isValidUserName = false;
                console.log('T??n t??i kho???n ???? t???n t???i!');
            }
            else {
                isValidUserName = true;
            }
        } while (!isValidUserName);
        return userName;
    }
    // nh???p m???t kh???u
    inputPassword(regexForPassword) {
        let passWord = '';
        let isValidPassword = true;
        do {
            passWord = rl.question('Nh???p m???t kh???u( C?? 1 k?? t??? vi???t hoa, 1 vi???t th?????ng, 1 k?? t??? ?????c bi???t v?? 1 s???): ');
            if (!regexForPassword.test(passWord)) {
                isValidPassword = false;
                console.log('Password nh???p v??o ph???i c?? ??t nh???t 1 k?? t??? th?????ng 1 hoa 1 ?????c bi???t 1 s???!');
            }
            else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return passWord;
    }
    // x??c nh???n m???t kh???u
    inputConfirmPassword(password) {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('Nh???p l???i m???t kh???u: ');
            if (confirmPassword != password) {
                console.log('M???t kh???u nh???p l???i kh??ng kh???p!');
            }
        } while (confirmPassword != password);
    }
    // nh???p tu???i
    inputAge() {
        let age = +rl.question('Nh???p tu???i c???a b???n: ');
        return age;
    }
    //nh???p email
    inputEmail() {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('Nh???p email c???a b???n: ');
            let regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('Email b???n nh???p kh??ng h???p l???!');
            }
            else {
                let currentEmail = this.userManager.findByEmail(email);
                if (currentEmail) {
                    isValidEmail = false;
                    console.log('Email n??y ???? t???n t???i!');
                }
                else {
                    isValidEmail = true;
                }
            }
        } while (!isValidEmail);
        return email;
    }
    //    End ????ng k??
    //    Open ????ng nh???p
    loginForm() {
        let choice = true;
        do {
            let nameAccount = rl.question('Nh???p t??i kho???n: ');
            let password = rl.question('Nh???p m???t kh???u: ');
            let currentUser = this.userManager.login(nameAccount, password);
            if (currentUser) {
                console.log('????ng nh???p th??nh c??ng!');
                if (currentUser.role == Role_1.role.ADMIN) {
                    //m??? menu admin
                    this.menuAdmin();
                    break;
                }
                else {
                    //m??? menu user
                    this.menuUser(currentUser);
                    break;
                }
            }
            else {
                console.log('T??i kho???n ho???c m???t kh???u kh??ng ????ng!');
                choice = false;
            }
        } while (!choice);
    }
    //Menu admin
    menuAdmin() {
        let choice = -1.;
        do {
            console.log('\n---????y l?? giao di???n Admin---');
            console.log('1. Hi???n th??? danh s??ch ng?????i d??ng ');
            console.log('2. T??m ki???m ng?????i d??ng');
            console.log('3. Th??m d???ch v??? ');
            console.log('4. Hi???n th??? danh s??ch d???ch v???');
            console.log('5. N???p ti???n');
            console.log('6. Danh s??ch m??y');
            console.log('7. B???t t???t m??y');
            console.log('8. ?????i m???t kh???u');
            console.log('0. ????ng xu???t\n');
            choice = +rl.question('Nh???p l???a ch???n c???a b???n: \n');
            switch (choice) {
                case 1:
                    console.log('\n---Danh s??ch ng?????i d??ng---');
                    this.showAllUser();
                    break;
                case 2:
                    console.log('\n---T??m ki???m---');
                    this.search();
                    break;
                case 3:
                    console.log('\n---Th??m d???ch v???---');
                    this.addService();
                    break;
                case 4:
                    console.log('\n---Hi???n th??? danh s??ch d???ch v???---');
                    this.showAllService();
                    break;
                case 5:
                    console.log('\n---N???p ti???n---');
                    this.recharge();
                    break;
                case 6:
                    console.log('\n---Danh s??ch m??y---');
                    this.showAllMachine();
                    break;
                case 7:
                    console.log('\n---Danh s??ch m??y---');
                    this.changeStatus();
                    break;
                case 8:
                    console.log('\n---?????i m???t kh???u---');
                    this.changePassword();
                    break;
            }
        } while (choice != 0);
    }
    //Hi???n th??? danh s??ch ng?????i d??ng
    showAllUser() {
        let user = this.userManager.getAll();
        for (let i = 0; i < user.length; i++) {
            console.log(`id: ${user[i].id}, T??n t??i kho???n: ${user[i].nameAccount}, email: ${user[i].email}, th???i gian: ${user[i].time}`);
        }
    }
    //T??m ki???m ng?????i d??ng
    search() {
        let search = rl.question('Nh???p t??n mu???n t??m ki???m: ');
        let searchAccount = this.userManager.findByNameAccount(search);
        if (searchAccount) {
            console.log('\n---T??i kho???n c???n t??m---');
            console.log(searchAccount);
        }
        else {
            console.log('\nKh??ng t??m th???y t??i kho???n!');
        }
    }
    //Th??m d???ch v???
    addService() {
        let name = rl.question('Nh???p t??n d???ch v???: ');
        let price = +rl.question('Nh???p gi?? d???ch v???: ');
        let service = new Service_1.Service(name, price);
        this.serviceManager.add(service);
        console.log('Th??m d???ch v??? th??nh c??ng!');
    }
    //Hi???n th??? danh s??ch d???ch v???
    showAllService() {
        console.log('\n---Danh s??ch d???ch v???---');
        let service = this.serviceManager.getAll();
        for (let i = 0; i < service.length; i++) {
            console.log(`  id: ${service[i].id}, T??n: ${service[i].name}, Gi??: ${service[i].price}`);
        }
    }
    //N???p ti???n
    recharge() {
        let nameAccount = rl.question('Nh???p t??n t??i kho???n: ');
        let user = this.userManager.findByNameAccount(nameAccount);
        if (user) {
            let input = +rl.question('Nh???p s??? ti???n mu???n n???p: ');
            user.time += Math.floor((input / 166.666));
            console.log('N???p th??nh c??ng!');
        }
        else {
            console.log('Kh??ng t??m th???y t??i kho???n!\n');
        }
    }
    //Danh s??ch m??y
    showAllMachine() {
        let machine = this.machine.getAll();
        for (let i = 0; i < machine.length; i++) {
            console.log(`${i}, t??n m??y: ${machine[i].name}, tr???ng th??i: ${machine[i].status}`);
        }
    }
    //B???t t???t m??y
    changeStatus() {
        let choice = -1;
        let machine = this.machine.getAll();
        for (let i = 0; i < machine.length; i++) {
            console.log(`${i}, t??n m??y: ${machine[i].name}, tr???ng th??i: ${machine[i].status}`);
        }
        console.log('1. b???t, t???t m??y');
        choice = +rl.question('M???i nh???p l???a ch???n: ');
        switch (choice) {
            case 1:
                let machieName = rl.question('Nh???p t??n m??y mu???n b???t, t???t: ');
                this.machine.convertStatus(machieName);
                break;
        }
    }
    changePassword() {
        let nameAccount = rl.question('Nh???p t??n t??i kho???n: ');
        let findNameAccount = this.userManager.findByNameAccount(nameAccount);
        if (findNameAccount) {
            let newPassword = rl.question('nh???p m???t kh???u m???i: ');
            findNameAccount.password = nameAccount;
            console.log('?????i m???t kh???u th??nh c??ng!');
        }
        else {
            console.log('B???n nh???p sai t??n t??i kho???n!');
        }
    }
    //End menu admin
    //Open menu User
    menuUser(user) {
        let user1 = user;
        let choice = -1;
        do {
            console.log(`\n---Ch??o m???ng ${user1.name}---`);
            console.log('1. Th??ng tin t??i kho???n c???a t??i');
            console.log('2. G???i d???ch v???');
            console.log('3. Gi??? h??ng');
            console.log('0. ????ng xu???t');
            choice = +rl.question('Nh???p l???a ch???n c???a b???n: \n');
            switch (choice) {
                case 1:
                    console.log('\n---T??i kho???n c???a t??i---');
                    this.accountInformation(user1);
                    break;
                case 2:
                    console.log('\n---Danh s??ch d???ch v???---');
                    this.selectService(user1);
                    break;
                case 3:
                    console.log('\n---Gi??? h??ng c???a b???n---');
                    this.pay(user1);
                    break;
                default:
                    break;
            }
        } while (choice != 0);
    }
    //th??ng tin t??i kho???n c???a t??i
    accountInformation(user) {
        let choice = -1;
        console.log(`      T??n: ${user.nameAccount}\n      M???t kh???u: ${user.password}\n      T??n: ${user.name}\n      email: ${user.email}\n      Tu???i: ${user.age}\n      Th???i gian: ${user.time}`);
        console.log('\n1. ?????i m???t kh???u');
        console.log('0. Tho??t');
        choice = +rl.question('Nh???p l???a ch???n c???a b???n: ');
        switch (choice) {
            case 1:
                let check = true;
                do {
                    let oldPassword = rl.question('Nh???p m???t kh???u c??: ');
                    if (user.password == oldPassword) {
                        let newPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
                        let passWord = this.inputPassword(newPassword);
                        user.password = passWord;
                        console.log('?????i m???t kh???u th??nh c??ng!\n');
                        check = true;
                    }
                    else {
                        console.log('M???t kh???u c?? kh??ng ????ng!');
                        check = false;
                    }
                } while (!check);
                break;
            case 2:
                break;
        }
    }
    //G???i d???ch v???
    selectService(user) {
        let service = this.serviceManager.getAll();
        let cartUser = user.getCart();
        for (let i = 0; i < service.length; i++) {
            console.log(`${i}. T??n: ${service[i].name}, Gi??: ${service[i].price}`);
        }
        let choice = -1;
        console.log('\n1. Ch???n d???ch v???');
        console.log('0. Tho??t');
        choice = +rl.question('Nh???p l???a ch???n c???a b???n: ');
        switch (choice) {
            case 1:
                let select = +rl.question('Nh???p d???ch v??? b??? ch???n: ');
                let findService = this.serviceManager.FindByIndex(select);
                if (findService) {
                    let findByCart = user.findByCart(findService);
                    if (!findByCart) {
                        let amount = +rl.question('Nh???p s??? l?????ng: ');
                        findService.amount += amount;
                        user.addToCart(findService);
                        console.log('Th??m th??nh c??ng!\n');
                    }
                    else {
                        let amount = +rl.question('Nh???p s??? l?????ng: ');
                        findService.amount += amount;
                        console.log('Th??m th??nh c??ng!\n');
                    }
                }
                else {
                    console.log('Kh??ng t??m th???y s???n ph???m!\n');
                }
                break;
            case 0:
                break;
        }
    }
    //Thanh to??n
    pay(user) {
        let choice = -1;
        let service = user.getCart();
        for (let i = 0; i < service.length; i++) {
            console.log(`${i} T??n: ${service[i].name}, Gi??: ${service[i].price}, s??? l?????ng: ${service[i].amount}`);
        }
        ;
        let totalMoney = user.getTotalMoney();
        console.log(`T???ng ti???n: ${totalMoney}`);
        console.log();
        console.log('\n---Tu??? ch???n---');
        console.log('1. Xo?? d???ch v???');
        console.log('2. Thay ?????i s??? l?????ng');
        console.log('3. Thanh to??n');
        console.log('0. Quay l???i');
        choice = +rl.question('Nh???p l???a ch???n c???a ban: ');
        switch (choice) {
            case 1:
                let index = +rl.question('Nh???p d???ch v??? mu???n xo??: ');
                user.remove(index);
                console.log('Xo?? th??nh c??ng!\n');
                break;
            case 2:
                let service = +rl.question('S???n ph???m mu???n ?????i: ');
                let findToCart = user.findToCart(service);
                if (findToCart) {
                    let amount = +rl.question('Nh???p s??? l?????ng mu???n ?????i: ');
                    findToCart.amount = amount;
                    console.log('Thay ?????i th??nh c??ng!\n');
                }
                else {
                    console.log('b???n nh???p sai s???n ph???m!\n');
                }
                break;
            case 3:
                console.log('THANH TO??N TH??NH C??NG!!\n');
                break;
        }
        ;
    }
}
exports.LoginMenu = LoginMenu;
LoginMenu.cart = new Cart_1.Cart();
