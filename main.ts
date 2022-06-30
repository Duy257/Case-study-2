import {LoginMenu} from "./menu/login-menu";
import {User} from "./model/User";
import {UserManager} from "./management/user/UserManager";
import {ServiceManager} from "./management/service/ServiceManager";
import {Service} from "./model/Service";

let loginMenu = new LoginMenu()
let userManager = new UserManager()
let serviceManager = new ServiceManager()


let acc1 = new User('duy', 'Duy1234@', 'duy', 20, 'duyy@gmail.com')
userManager.add(acc1);
let ser1 = new Service('phở bò', 30000)
let ser2 = new Service('cơm rang', 30000);
let ser3 = new Service('mì trứng', 25000)
serviceManager.add(ser1)
serviceManager.add(ser2)
serviceManager.add(ser3)

loginMenu.run()





