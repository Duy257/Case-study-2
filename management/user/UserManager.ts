import {User} from "../../model/User";
import {role} from "../../model/Role";
import {IUserManagement} from "./I-userManagement";
import {Service} from "../../model/Service";


export class UserManager implements IUserManagement {
    private static arr: User[] = [];
    private static id: number = 1;

    constructor() {
        let admin = new User('admin', '123456', 'ADMIN', 20, 'duy@gmail.com')
        admin.id = UserManager.id;
        admin.role = role.ADMIN;
        UserManager.arr.push(admin)

    }
    getAll(): User[] {
        return UserManager.arr;
    }

    add(t: User): void {
        UserManager.id++;
        t.id = UserManager.id;
        t.role = role.USER;
        UserManager.arr.push(t);
    }


    delete(id : number) :void  {
        let index = this.findById(id);
        if(index != -1)
        UserManager.arr.splice(index, 1)
    };

    findById(id: number): number {
        let index = -1;
        for (let i = 0; i < UserManager.arr.length; i++) {
            if (UserManager.arr[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    findByNameAccount(nameAccount: string): User | null {
        for (let user of UserManager.arr) {
            if (nameAccount == user.nameAccount) {
                return user
                break;
            }
        }
        return null;
    }

    findByPassword(passWord: string): User | null {
        for (let user of UserManager.arr) {
            if (passWord == user.password) {
                return user
                break;
            }
        }
        return null;
    }

    findByEmail(email: string): User | null {
        for (let user of UserManager.arr) {
            if (email == user.email) {
                return user
                break;
            }
        }
        return null;
    }

    login(nameAccount: string, password: string): User | null {
        for (let user of UserManager.arr) {
            if (nameAccount == user.nameAccount && password == user.password) {
                return user;
            }
        }
        return null;
    }



}
