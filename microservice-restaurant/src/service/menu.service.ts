import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import MenuModel from "../Models/Menu.model";
import { ObjectId } from "mongodb";
import { IMenu } from "../types/menu";


export async function createMenu(input: IMenu) {
    try {
        const menu = await MenuModel.create(input);
        return menu;
    } catch(e) {
        throw e;
    }
}

export async function findMenu(
    id: ObjectId
) {
    try {
        const menu = await MenuModel.findById(id);
        return menu;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateMenu(
    query: FilterQuery<IMenu>,
    update: UpdateQuery<IMenu>,
    options: QueryOptions
) {
    return MenuModel.findOneAndUpdate(query, update, options);
}

export async function deleteMenu(query: FilterQuery<IMenu>) {
    return MenuModel.deleteOne(query);
}