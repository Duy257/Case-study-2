import {UserManager} from "../management/user/UserManager";
import * as rl from "readline-sync";
import {User} from "../model/User";
import {role} from "../model/Role";
import {ServiceManager} from "../management/service/ServiceManager";
import {Service} from "../model/Service";
import {Cart} from "../model/Cart";
import {MachineManagement} from "../management/machine/MachineManagement";
// import {ReadFileAccount} from "../model/ReadFileAccount";

enum LoginChoice {
    LOGIN = 1,
    REGISTER = 2
}
export class LoginMenu {
    private userManager = new UserManager();
    private serviceManager = new ServiceManager();
    private static cart = new Cart();
    private machine = new MachineManagement();
    // private readToFileAccount = new ReadFileAccount();

    run() {
        let choice = -1;
        do {
            console.log('---Chào mừng đến với net DUY NGUYỄN---');
            console.log('1. Đăng nhập');
            console.log('2. Đăng ký');
            console.log('0. Thoát');
            choice = +rl.question('Nhập lựa chọn của bạn: ');
            switch (choice) {
                case LoginChoice.LOGIN: {
                    console.log('---Đăng nhập---');
                    this.loginForm();
                    break;
                }
                case LoginChoice.REGISTER: {
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
        if (user != null) {
            this.userManager.add(user)
            // this.readToFileAccount.writeToFile(user);
            console.log('Đăng kí thành công!')
        } else {
            console.log('Đăng kí thất bại!')
        }
    }

    iputUser(): User | null {
        let userName = this.inputUserName();
        let regexForPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let passWord = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(passWord)
        let name = rl.question('Nhập tên của bạn: ');
        let age = this.inputAge();
        if (age < 18) {
            console.log('Bạn chưa đủ tuổi đi nét!');
            return null;
        }
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
            if (currentUser) {
                isValidUserName = false;
                console.log('Tên tài khoản đã tồn tại!')
            } else {
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
            } else {
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
            if (confirmPassword != password) {
                console.log('Mật khẩu nhập lại không khớp!')
            }
        }
        while (confirmPassword != password);
    }

    // nhập tuổi
    inputAge() {
        let age: number = +rl.question('Nhập tuổi của bạn: ');
        return age;
    }

    //nhập email
    inputEmail() {
        let email = '';
        let isValidEmail = true;

        do {
            email = rl.question('Nhập email của bạn: ');
            let regexForEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('Email bạn nhập không hợp lệ!')
            } else {
                let currentEmail = this.userManager.findByEmail(email);
                if (currentEmail) {
                    isValidEmail = false;
                    console.log('Email này đã tồn tại!')
                } else {
                    isValidEmail = true;
                }
            }
        }
        while (!isValidEmail);
        return email;
    }
//    End đăng kí


//    Open đăng nhập
    loginForm() {
        let choice = true;
        do {
            let nameAccount = rl.question('Nhập tài khoản: ');
            let password = rl.question('Nhập mật khẩu: ');

            let currentUser = this.userManager.login(nameAccount, password);
            if (currentUser) {
                console.log('Đăng nhập thành công!');
                if (currentUser.role == role.ADMIN) {
                    //mở menu admin
                    this.menuAdmin();
                } else {
                    //mở menu user
                    this.menuUser();
                    let user = currentUser;

                }
            } else {
                console.log('Tài khoản hoặc mật khẩu không đúng!');
                choice = false;
            }
        }
        while (!choice)
    }

    //Menu admin
    menuAdmin() {
        let choice = -1.
        do {
            console.log('---Đây là giao diện Admin---');
            console.log('1. Hiển thị danh sách người dùng ');
            console.log('2. Tìm kiếm người dùng');
            console.log('3. Thêm dịch vụ ');
            console.log('4. Hiển thị danh sách dịch vụ');
            console.log('5. Nạp tiền');
            console.log('6. Danh sách máy');
            console.log('7. Bật tắt máy');
            console.log('8. Đổi mật khẩu');
            console.log('0. Đăng xuất');
            choice = +rl.question('Nhập lựa chọn của bạn: ');
            switch (choice) {
                case 1:
                    console.log('---Danh sách người dùng---');
                    this.showAllUser();
                    break;

                case 2:
                    console.log('---Tìm kiếm---');
                    this.search();
                    break;

                case 3:
                    console.log('---Thêm dịch vụ---');
                    this.addService();
                    break;
                case 4:
                    console.log('---Hiển thị danh sách dịch vụ---');
                    this.showAllService();
                    break;
                case 5:
                    console.log('---Nạp tiền---');
                    this.recharge();
                    break;
                case 6:
                    console.log('---Danh sách máy---');
                    this.showAllMachine();
                    break;
                case 7:
                    console.log('---Danh sách máy---');
                    this.changeStatus();
                    break;
                case 8:
                    console.log('---Đổi mật khẩu---');
                    this.changePassword();
                    break;
                default:
                    break;
            }
        }
        while (choice != 0)
    }

    //Hiển thị danh sách người dùng
    showAllUser() {
        let user = this.userManager.getAll();
        for(let i = 0; i < user.length; i++){
            console.log(`id: ${user[i].id}, Tên tài khoản: ${user[i].nameAccount}, email: ${user[i].email}, thời gian: ${user[i].time}`);
        }
    }

    //Tìm kiếm người dùng
    search() {
        let search: string = rl.question('Nhập tên muốn tìm kiếm: ')
        let searchAccount = this.userManager.findByNameAccount(search);
        if (searchAccount) {
            console.log('---Tài khoản cần tìm---');
            console.log(searchAccount)
        } else {
            console.log('Không tìm thấy tài khoản!')
        }
    }

    //Thêm dịch vụ
    addService() {
        let name: string = rl.question('Nhập tên dịch vụ: ');
        let price: number = +rl.question('Nhập giá dịch vụ: ');
        let service = new Service(name, price);
        this.serviceManager.add(service);
        console.log('Thêm dịch vụ thành công!');

    }

    //Hiển thị danh sách dịch vụ
    showAllService() {
        console.log('---Danh sách dịch vụ---')
        let service = this.serviceManager.getAll();
        for (let i = 0; i < service.length; i++) {
            console.log(`  id: ${service[i].id}, Tên: ${service[i].name}, Giá: ${service[i].price}`)
        }
    }
    //Nạp tiền
    recharge(): void {
        let nameAccount: string = rl.question('Nhập tên tài khoản: ');
        let user = this.userManager.findByNameAccount(nameAccount);
        if (user) {
            let input: number = +rl.question('Nhập số tiền muốn nạp: ');
            user.time += Math.floor((input / 166.666));
            console.log('Nạp thành công!');
        }else {
            console.log('Không tìm thấy tài khoản!');
        }
    }

    //Danh sách máy
    showAllMachine() {
        let machine = this.machine.getAll();
        for(let i = 0; i < machine.length; i++){
            console.log(`${i}, tên máy: ${machine[i].name}, trạng thái: ${machine[i].status}`);
        }
    }

    //Bật tắt máy
    changeStatus() {
        let choice: number = -1;
        let machine = this.machine.getAll();
        for(let i = 0; i < machine.length; i++){
            console.log(`${i}, tên máy: ${machine[i].name}, trạng thái: ${machine[i].status}`);
        }
        console.log('1. bật, tắt máy')
        choice = +rl.question('Mời nhập lựa chọn: ')
        switch (choice) {
            case 1:
                let machieName = rl.question('Nhập tên máy muốn bật, tắt: ');
                this.machine.convertStatus(machieName);
                break;
        }
    }

    changePassword() {
        let nameAccount = rl.question('Nhập tên tài khoản: ');
        let findNameAccount = this.userManager.findByNameAccount(nameAccount);
        if(findNameAccount) {
            let newPassword = rl.question('nhập mật khẩu mới: ');
            findNameAccount.password = nameAccount;
            console.log('Đổi mật khẩu thành công!');
        }else {
            console.log('Bạn nhập sai tên tài khoản!')
        }
    }

    //End menu admin

    //Open menu User
    menuUser() {
        let choice = -1
        do {
            console.log('---Xin mời chọn dịch vụ---');
            console.log('1. Thông tin tài khoản của tôi')
            console.log('2. Gọi dịch vụ');
            console.log('3. Giỏ hàng');
            console.log('0. Đăng xuất');

            choice = +rl.question('Nhập lựa chọn của bạn: ')

            switch (choice) {
                case 1:
                    console.log('---Tài khoản của tôi---');
                    this.userManager.getAll();
                case 2:
                    console.log('---Danh sách dịch vụ---');
                    this.selectService();
                    break;
                case 3:
                    console.log('---Giỏ hàng của bạn---')
                    this.pay();
                    break;
            }
        }
        while (choice != 0)

    }

    //Gọi dịch vụ
    selectService() {
        let service = this.serviceManager.getAll();
        for(let i = 0; i < service.length; i++) {
            console.log(`${i}. Tên: ${service[i].name}, Giá: ${service[i].price}`);
        }
        let select = +rl.question('Nhập dịch vụ bạ chọn: ');
        let findService = this.serviceManager.findById(select);
        if (findService) {

            console.log('Thêm thành công!')
        }else {
            console.log('Không tìm thấy sản phẩm!')
        }
    }

    //Thanh toán
    pay() {
        let total = LoginMenu.cart.totalMoney;
        let choice = -1;
        let cart = LoginMenu.cart.arrService;
        for (let i = 0; i < cart.length; i++) {
            console.log(`${i} Tên: ${cart[i].name}, Giá: ${cart[i].price}`);
        };
        console.log(`Tổng tiền: ${total}`)
        console.log()
        console.log('---Tuỳ chọn---');
        console.log('1. Xoá dịch vụ');
        console.log('2. Thanh toán');
        console.log('0. Quay lại');

        choice = +rl.question('Nhập lựa chọn của ban: ')

        switch (choice) {
            case 1:
                let name: string = rl.question('Nhập tên dịch vụ muốn xoá: ');
                let currenName = LoginMenu.cart.findByName(name);
                if (currenName) {
                    LoginMenu.cart.remove(currenName);
                    console.log('xoá thành công!')
                }else {
                    console.log('Không tìm thấy sản phẩm!')
                }
                break;
            case 2:
                console.log('THANH TOÁN THÀNH CÔNG!!')
                break;
        };
    }

}