import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import DeliveryModel from "../Models/Delivery.model";
import { ObjectId } from "mongodb";
import { IDelivery } from "../types/delivery";


export async function createDelivery(input: IDelivery) {
    try {
        const delivery = await DeliveryModel.create(input);
        return delivery;
    } catch(e) {
        throw e;
    }
}

export async function findDelivery(
    id: ObjectId
) {
    try {
        const delivery = await DeliveryModel.findById(id);
        return delivery;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateDelivery(
    query: FilterQuery<IDelivery>,
    update: UpdateQuery<IDelivery>,
    options: QueryOptions
) {
    return DeliveryModel.findOneAndUpdate(query, update, options);
}

export async function deleteDelivery(query: FilterQuery<IDelivery>) {
    return DeliveryModel.deleteOne(query);
}