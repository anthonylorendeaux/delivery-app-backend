import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ArticleModel from "../Models/Article.model";
import { ObjectId } from "mongodb";
import { IArticle } from "../types/article";
import ArticleCategoryModel from "Models/ArticleCategory.model";


export async function createArticle(input: IArticle) {
    try {
        const article = await ArticleModel.create(input);
        return article;
    } catch(e) {
        throw e;
    }
}

export async function findArticle(
    id: ObjectId
) {
    try {
        const article = await ArticleModel.findById(id).populate({
            path: 'articleCategory',
          })
        
        return article;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateArticle(
    query: FilterQuery<IArticle>,
    update: UpdateQuery<IArticle>,
    options: QueryOptions
) {
    return ArticleModel.findOneAndUpdate(query, update, options).populate("articleCategory");
}

export async function deleteArticle(query: FilterQuery<IArticle>) {
    return ArticleModel.deleteOne(query);
}