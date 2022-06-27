import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OrderModel from "../Models/Order.model";
import { ObjectId } from "mongodb";
import { IOrder } from "../types/Order";


export async function createOrder(input: IOrder) {
    try {
        const delivery = await OrderModel.create(input);
        return delivery;
    } catch(e) {
        throw e;
    }
}

export async function findOrder(
    id: ObjectId
) {
    try {
        const delivery = await OrderModel.findById(id);
        return delivery;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateOrder(
    query: FilterQuery<IOrder>,
    update: UpdateQuery<IOrder>,
    options: QueryOptions
) {
    return OrderModel.findOneAndUpdate(query, update, options);
}

export async function deleteOrder(query: FilterQuery<IOrder>) {
    return OrderModel.deleteOne(query);
}