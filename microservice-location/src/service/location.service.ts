import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import LocationModel from "../Models/Location.model";
import { ObjectId } from "mongodb";
import { ILocation } from "../types/location";


export async function createLocation(input: ILocation) {
    try {
        const location = await LocationModel.create(input);
        return location;
    } catch(e) {
        throw e;
    }
}

export async function findLocation(
    id: ObjectId
) {
    try {
        const location = await LocationModel.findById(id);
        return location;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateLocation(
    query: FilterQuery<ILocation>,
    update: UpdateQuery<ILocation>,
    options: QueryOptions
) {
    return LocationModel.findOneAndUpdate(query, update, options);
}

export async function deleteLocation(query: FilterQuery<ILocation>) {
    return LocationModel.deleteOne(query);
}