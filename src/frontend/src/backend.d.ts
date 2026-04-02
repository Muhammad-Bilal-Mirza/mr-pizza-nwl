import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    name: string;
    description: string;
    imageURL: string;
    category: Category;
    price: bigint;
}
export enum Category {
    dessert = "dessert",
    seafood = "seafood",
    meat = "meat",
    highlights = "highlights",
    specialty = "specialty",
    vegetarian = "vegetarian"
}
export interface backendInterface {
    findMenuItem(itemName: string): Promise<MenuItem | null>;
    getItemsByCategory(category: Category): Promise<Array<MenuItem>>;
    getMenu(): Promise<Array<MenuItem>>;
    getRestaurantInfo(): Promise<string>;
}
