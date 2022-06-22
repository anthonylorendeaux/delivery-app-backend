import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ArticleCategoryModel from "../Models/ArticleCategory.model";
import { ObjectId } from "mongodb";
import { IArticleCategory } from "types/articleCategory";


export async function createArticleCategory(input: IArticleCategory) {
    try {
        const articleCategory = await ArticleCategoryModel.create(input);
        return articleCategory;
    } catch(e) {
        throw e;
    }
}

export async function findArticleCategory(
    id: ObjectId
) {
    try {
        const articleCategory = await ArticleCategoryModel.findById(id);
        return articleCategory;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateArticleCategory(
    query: FilterQuery<IArticleCategory>,
    update: UpdateQuery<IArticleCategory>,
    options: QueryOptions
) {
    return ArticleCategoryModel.findOneAndUpdate(query, update, options);
}

export async function deleteArticleCategory(query: FilterQuery<IArticleCategory>) {
    return ArticleCategoryModel.deleteOne(query);
}