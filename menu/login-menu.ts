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
            console.log('---Chào mừng đến với net Duy Nguyễn---');
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
                    break;
                } else {
                    //mở menu user
                    this.menuUser(currentUser);
                    break;
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
            console.log('\n---Đây là giao diện Admin---');
            console.log('1. Hiển thị danh sách người dùng ');
            console.log('2. Tìm kiếm người dùng');
            console.log('3. Thêm dịch vụ ');
            console.log('4. Hiển thị danh sách dịch vụ');
            console.log('5. Nạp tiền');
            console.log('6. Danh sách máy');
            console.log('7. Bật tắt máy');
            console.log('8. Đổi mật khẩu');
            console.log('0. Đăng xuất\n');
            choice = +rl.question('Nhập lựa chọn của bạn: \n');
            switch (choice) {
                case 1:
                    console.log('\n---Danh sách người dùng---');
                    this.showAllUser();
                    break;

                case 2:
                    console.log('\n---Tìm kiếm---');
                    this.search();
                    break;

                case 3:
                    console.log('\n---Thêm dịch vụ---');
                    this.addService();
                    break;
                case 4:
                    console.log('\n---Hiển thị danh sách dịch vụ---');
                    this.showAllService();
                    break;
                case 5:
                    console.log('\n---Nạp tiền---');
                    this.recharge();
                    break;
                case 6:
                    console.log('\n---Danh sách máy---');
                    this.showAllMachine();
                    break;
                case 7:
                    console.log('\n---Danh sách máy---');
                    this.changeStatus();
                    break;
                case 8:
                    console.log('\n---Đổi mật khẩu---');
                    this.changePassword();
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
            console.log('\n---Tài khoản cần tìm---');
            console.log(searchAccount)
        } else {
            console.log('\nKhông tìm thấy tài khoản!')
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
        console.log('\n---Danh sách dịch vụ---')
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
            console.log('Không tìm thấy tài khoản!\n');
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
    menuUser(user: User) {
        let user1 = user
        let choice = -1
        do {
            console.log(`\n---Chào mừng ${user1.name}---`);
            console.log('1. Thông tin tài khoản của tôi')
            console.log('2. Gọi dịch vụ');
            console.log('3. Giỏ hàng');
            console.log('0. Đăng xuất');

            choice = +rl.question('Nhập lựa chọn của bạn: \n')

            switch (choice) {
                case 1:
                    console.log('\n---Tài khoản của tôi---');
                    this.accountInformation(user1)
                    break;
                case 2:
                    console.log('\n---Danh sách dịch vụ---');
                    this.selectService(user1);
                    break;
                case 3:
                    console.log('\n---Giỏ hàng của bạn---')
                    this.pay(user1);
                    break;
                default:
                    break;
            }
        }
        while (choice != 0)
    }

    //thông tin tài khoản của tôi
    accountInformation(user: User) {
        let choice = -1;
        console.log(`      Tên: ${user.nameAccount}\n      Mật khẩu: ${user.password}\n      Tên: ${user.name}\n      email: ${user.email}\n      Tuổi: ${user.age}\n      Thời gian: ${user.time}`);
        console.log('\n1. Đổi mật khẩu')
        console.log('0. Thoát')
        choice = +rl.question('Nhập lựa chọn của bạn: ');
        switch (choice) {
            case 1:
                let check = true;
                do{
                    let oldPassword = rl.question('Nhập mật khẩu cũ: ');
                    if(user.password == oldPassword){
                        let newPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
                        let passWord = this.inputPassword(newPassword);
                        user.password = passWord;
                        console.log('Đổi mật khẩu thành công!\n')
                        check = true;
                    }else {
                        console.log('Mật khẩu cũ không đúng!')
                        check = false;
                    }
                }while (!check)

                break;
            case 2:
                break;
        }

    }

    //Gọi dịch vụ
    selectService(user: User) {
        let service = this.serviceManager.getAll();
        let cartUser = user.getCart();
        for(let i = 0; i < service.length; i++) {
            console.log(`${i}. Tên: ${service[i].name}, Giá: ${service[i].price}`);
        }

        let choice = -1;
        console.log('\n1. Chọn dịch vụ');
        console.log('0. Thoát')
        choice = +rl.question('Nhập lựa chọn của bạn: ')
        switch (choice) {
            case 1:
                let select = +rl.question('Nhập dịch vụ bạ chọn: ');
                let findService = this.serviceManager.FindByIndex(select);
                if (findService) {
                    let findByCart = user.findByCart(findService);
                    if(!findByCart) {
                        let amount = +rl.question('Nhập số lượng: ');
                        findService.amount += amount;
                        user.addToCart(findService);
                        console.log('Thêm thành công!\n')
                    }else {
                        let amount = +rl.question('Nhập số lượng: ');
                        findService.amount += amount;
                        console.log('Thêm thành công!\n')
                    }

                }else {
                    console.log('Không tìm thấy sản phẩm!\n')
                }
                break;
            case 0:
                break;
        }

    }

    //Thanh toán
    pay(user: User) {
        let choice = -1;
        let service = user.getCart();
        for (let i = 0; i < service.length; i++) {
            console.log(`${i} Tên: ${service[i].name}, Giá: ${service[i].price}, số lượng: ${service[i].amount}`);
        };
        let totalMoney = user.getTotalMoney();
        console.log(`Tổng tiền: ${totalMoney}`);
        console.log()
        console.log('\n---Tuỳ chọn---');
        console.log('1. Xoá dịch vụ');
        console.log('2. Thay đổi số lượng')
        console.log('3. Thanh toán');
        console.log('0. Quay lại');

        choice = +rl.question('Nhập lựa chọn của ban: ')

        switch (choice) {
            case 1:
                let index: number = +rl.question('Nhập dịch vụ muốn xoá: ');
                user.remove(index);
                console.log('Xoá thành công!\n')
                break;
            case 2:
                let service = +rl.question('Sản phẩm muốn đổi: ');
                let findToCart = user.findToCart(service);
                if (findToCart) {
                    let amount = +rl.question('Nhập số lượng muốn đổi: ');
                    findToCart.amount = amount;
                    console.log('Thay đổi thành công!\n');
                }else {
                    console.log('bạn nhập sai sản phẩm!\n');
                }
                break;
            case 3:
                console.log('THANH TOÁN THÀNH CÔNG!!\n');
                break;
        };
    }

}