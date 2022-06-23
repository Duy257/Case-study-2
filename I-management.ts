export interface IManagement<T> {
    add (t: T): void;

    delete(id :number) : void;

    findById(id: number): void;

}