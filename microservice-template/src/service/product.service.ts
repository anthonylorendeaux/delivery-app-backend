import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel from "../Models/Product.model";
import { IProduct } from "../types/product";

export async function createProduct(input: IProduct) {
    try {
        const product = await ProductModel.create(input);
        return product;
    } catch(e) {
        throw e;
    }
}

export async function findProduct(
    id: String
) {
    try {
        const product = await ProductModel.findById(id);
        return product;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateProduct(
    query: FilterQuery<IProduct>,
    update: UpdateQuery<IProduct>,
    options: QueryOptions
) {
    return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<IProduct>) {
    return ProductModel.deleteOne(query);
}