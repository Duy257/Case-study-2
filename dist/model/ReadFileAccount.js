"use strict";
// const fs = require('fs')
// import {User} from "./User";
//
//
// export class ReadFileAccount {
//     private arrAccount: any[] = [];
//     writeToFile(account: User): void {
//         const data = fs.readFileSync('database/FileAccont.json', {encoding: 'utf-8', flag: 'r'});
//         this.arrAccount = JSON.parse((data));
//         let id = this.arrAccount[this.arrAccount.length - 1].id + 1;
//         account.id = id;
//         this.arrAccount.push(account);
//         let data1 = JSON.stringify(this.arrAccount);
//
//         fs.writeFileSync('database/FileAccont.json', data1);
//     }
//
//     readToFile(): User[]{
//         let data = fs.readFileSync('database/FileAccont.json', {encoding: 'utf-8', flag:'r'});
//         let arrData: any[] = JSON.parse(data);
//         let users: User[] = [];
//         for (let i = 0; i < arrData.length; i++) {
//             let id = arrData[i].id;
//             let nameAccount = arrData[i].nameAccount;
//             let password = arrData[i].password;
//             let name = arrData[i].password;
//             let age = arrData[i].age;
//             let email = arrData[i].email;
//             let role = arrData[i].role;
//             let time =  arrData[i].time;
//
//             let user = new User(nameAccount, password, name, age, email);
//             user.id = id;
//             user.role = role;
//
//             users.push(user);
//         }
//         return users;
//     }
// }
