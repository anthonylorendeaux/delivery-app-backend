import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import RestaurantCategoryModel from "../Models/RestaurantCategory.model";
import { ObjectId } from "mongodb";
import { IRestaurantCategory } from "../types/restaurantCategory";


export async function createRestaurantCategory(input: IRestaurantCategory) {
    try {
        const restaurantCategory = await RestaurantCategoryModel.create(input);
        return restaurantCategory;
    } catch(e) {
        throw e;
    }
}

export async function findRestaurantCategory(
    id: ObjectId
) {
    try {
        const restaurantCategory = await RestaurantCategoryModel.findById(id);
        return restaurantCategory;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateRestaurantCategory(
    query: FilterQuery<IRestaurantCategory>,
    update: UpdateQuery<IRestaurantCategory>,
    options: QueryOptions
) {
    return RestaurantCategoryModel.findOneAndUpdate(query, update, options);
}

export async function deleteRestaurantCategory(query: FilterQuery<IRestaurantCategory>) {
    return RestaurantCategoryModel.deleteOne(query);
}