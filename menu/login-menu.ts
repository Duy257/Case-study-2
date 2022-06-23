import {UserManager} from "../management/user/UserManager";
import * as rl from "readline-sync";
import {User} from "../model/User";

enum LoginChoice {
    LOGIN = 1,
    REGISTER = 2
}
export class LoginMenu {
    private userManager = new UserManager()

    run() {
        let choice = -1;
        do {
            console.log('---Hệ thống quản lý sản phẩm---');
            console.log('1. Đăng nhập');
            console.log('2. Đăng ký');
            console.log('0. Thoát');
            choice = +rl.question('Nhập lựa chọn của bạn:');
            switch (choice) {
                case LoginChoice.LOGIN: {
                    console.log('---Đăng nhập---');
                }
                case LoginChoice.REGISTER:{
                    console.log('---Đăng ký tài khoản---');
                    this.registerForm();
                    break;
                }
            }
        } while (choice != 0);
    }
    //Open đăng kí
    registerForm() {
        let user = this.iputUser();
        this.userManager.add(user);
        console.log('Đăng kí thành công!')
    }

    iputUser(): User {
        let userName = this.inputUserName();
        let regexForPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let passWord = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(passWord)
        let name = rl.question('Nhập tên của bạn: ');
        let age = this.inputAge();
        let email = this.inputEmail();
        return new User(userName, passWord, name, age, email);

    }
    // nhập tên
    inputUserName(): string {
        let userName = '';
        let isValidUserName = true;

        do {
            userName = rl.question('Nhập tên: ')
            let currentUser = this.userManager.findByNameAccount(userName);
            if(currentUser) {
                isValidUserName = false;
                console.log('Tên tài khoản đã tồn tại!')
            }else {
                isValidUserName = true;
            }
        }
        while (!isValidUserName)
        return userName;
    }

    // nhập mật khẩu
    inputPassword(regexForPassword: RegExp): string {
        let passWord = '';
        let isValidPassword = true;

        do {
            passWord = rl.question('Nhập mật khẩu( Có 1 ký tự viết hoa, 1 viết thường, 1 ký tự đặc biệt và 1 số): ')
            if (!regexForPassword.test(passWord)) {
                isValidPassword = false;
                console.log('Password nhập vào phải có ít nhất 1 ký tự thường 1 hoa 1 đặc biệt 1 số!')
            }else {
                isValidPassword = true;
            }
        }
        while (!isValidPassword)
        return passWord;
    }

    // xác nhận mật khẩu
    inputConfirmPassword(password: string): void {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('Nhập lại mật khẩu: ')
            if(confirmPassword != password) {
                console.log('Mật khẩu nhập lại không khớp!')
            }
        }
        while (confirmPassword != password);
    }
//    End đăng kí

    //Open check Email
    inputEmail() {
        let email = '';
        let isValidEmail = true;

        do {
            email = rl.question('Nhập email của bạn: ');
            let regexForEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)){
                isValidEmail = false;
                console.log('Email bạn nhập không hợp lệ!')
            }else {
                let currentEmail = this.userManager.findByEmail(email);
                if (currentEmail) {
                    isValidEmail = false;
                    console.log('Email này đã tồn tại!')
                }else {
                    isValidEmail = true;
                }
            }
        }
        while (!isValidEmail);
        return email;
    }

    // nhập tuổi
    inputAge() {
        let age: number;
        let isValidAge = true;

        do {
            age = +rl.question('Nhập tuổi của bạn: ');
            if (age < 18) {
                isValidAge = false;
                console.log('Bạn chưa đủ tuổi chơi net!')

            }else {
                isValidAge = true;
            }
        }
        while (!isValidAge);
        return age;

    }
}