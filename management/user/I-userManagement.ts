import {IManagement} from "../../I-management";
import {User} from "../../model/User";

export interface IUserManagement extends IManagement<User> {
    getAll() : User[];

    login(username: string, password: string): User | null;

    findById(id: number): number;

    findByNameAccount(nameAccount: string): User | null;

    findByPassword(password: string): User | null;

    findByEmail(email: string): User | null;
}
