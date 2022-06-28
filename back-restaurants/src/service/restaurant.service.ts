import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IRestaurant } from "../types/restaurant";
import RestaurantModel from "../Models/Restaurant.model";
import { ObjectId } from "mongodb";


export async function createRestaurant(input: IRestaurant) {
    try {
        const restaurant = await RestaurantModel.create(input);
        return restaurant;
    } catch(e) {
        throw e;
    }
}

export async function findRestaurant(
    id: ObjectId
) {
    try {
        const restaurant = await RestaurantModel.findById(id).populate("articles").populate("menus");
        return restaurant;
    } catch(e) {
        throw e;
    }
}

export async function findAllRestaurants() {
    try {
        const restaurants = await RestaurantModel.find().populate("articles").populate("menus");
        return restaurants;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateRestaurant(
    query: FilterQuery<IRestaurant>,
    update: UpdateQuery<IRestaurant>,
    options: QueryOptions
) {
    return RestaurantModel.findOneAndUpdate(query, update, options);
}

export async function deleteRestaurant(query: FilterQuery<IRestaurant>) {
    return RestaurantModel.deleteOne(query);
}