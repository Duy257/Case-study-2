import {Service} from "../../model/Service";
import {UserManager} from "../user/UserManager";

export class ServiceManager {
    public static arr: Service[] = [];
    private static id: number = 0;

     constructor() {
         ServiceManager.arr.push(new Service('Mì trứng', 20000));
     }

     getAll() {
         return ServiceManager.arr;
     }

     add(t: Service): void {
         ServiceManager.id++;
         t.id = ServiceManager.id;
         ServiceManager.arr.push(t);
     }

     remove(id: number) {
         for(let i = 0; i < ServiceManager.arr.length; i++) {
             if(id == ServiceManager.arr[i].id) {
                 ServiceManager.arr.splice(i, 1)
             }
         }
     }

     findByName(name: string): Service | null {
         for (let service of ServiceManager.arr) {
             if (name == service.name) {
                 return service
                 break;
             }
         }
         return null;
     }
}