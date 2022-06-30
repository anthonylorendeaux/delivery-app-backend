import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createArticle, deleteArticle, findAndUpdateArticle, findArticle } from '../service/article.service';
import { IDeleteArticleReq, IGetArticleReq, IUpdateArticleReq } from '../types/article';
import ArticleModel from "../Models/Article.model";
import { updateRestaurantHandler } from "./Restaurant.controller";
import RestaurantModel from "Models/Restaurant.model";
import { findAndUpdateRestaurant } from "../service/restaurant.service";
import mongoose, { Schema, Document, Types } from "mongoose"

export async function createArticleHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  delete body["_id"];
  
  const article = await createArticle(body);
  await findAndUpdateRestaurant(body.restaurantId, {
    $push: {
      articles: article._id
    }
  }, {safe: true, upsert: true}
  );
  return res.send(article);
}

export async function updateArticleHandler(
  req: Request,
  res: Response
) {
  
  Logger.warn(req.params.id);

  const articleId = new mongoose.Types.ObjectId(req.params.id);
  Logger.warn(articleId);
  const body = req.body;

  delete body["_id"];
  Logger.info(body);

  const article = await findArticle(articleId);
  Logger.warn(article)

  if(!article) {
    return res.sendStatus(404);
  }

  const updatedArticle = await ArticleModel.findByIdAndUpdate(articleId, body, {new: true});
  Logger.warn(updatedArticle)
  return res.send(updatedArticle);
}

export async function getArticleHandler(
  req: Request,
  res: Response
) {
  const articleId = new mongoose.Types.ObjectId(req.params.id)
  const article = await findArticle(articleId);

  if (!article) {
    return res.sendStatus(404);
  }

  return res.send(article);
}

export async function deleteArticleHandler(
  req: Request,
  res: Response
) {
  const articleId = new mongoose.Types.ObjectId(req.params.id)
  const article = await findArticle(articleId);

  if (!article) {
    return res.sendStatus(404);
  }
  await deleteArticle({_id: articleId});

  return res.send(article);
}

export async function getAllArticleHandler(
  req: Request,
  res: Response
) {
  const articles = await ArticleModel.find({});
  return res.send(articles);
}

