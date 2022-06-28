import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createArticle, deleteArticle, findAndUpdateArticle, findArticle } from '../service/article.service';
import { IDeleteArticleReq, IGetArticleReq, IUpdateArticleReq } from '../types/article';
import ArticleModel from "../Models/Article.model";
import { updateRestaurantHandler } from "./Restaurant.controller";
import RestaurantModel from "Models/Restaurant.model";
import { findAndUpdateRestaurant } from "../service/restaurant.service";

export async function createArticleHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const article = await createArticle(body);
  await findAndUpdateRestaurant(body.restaurantId, {
    $push: {
      articleIds: article._id
    }
  }, {safe: true, upsert: true}
  );
  
  return res.send(article);
}

export async function updateArticleHandler(
  req: IUpdateArticleReq,
  res: Response
) {
  
  const articleId = req.params.id;
  const body = req.body;

  const article = await findArticle(articleId);

  if(!article) {
    return res.sendStatus(404);
  }

  const updatedArticle = await findAndUpdateArticle({articleId}, body, {new: true});

  return res.send(updatedArticle);
}

export async function getArticleHandler(
  req: IGetArticleReq,
  res: Response
) {
  const articleId = req.params.id;
  const article = await findArticle(articleId);

  if (!article) {
    return res.sendStatus(404);
  }

  return res.send(article);
}

export async function deleteArticleHandler(
  req: IDeleteArticleReq,
  res: Response
) {
  const articleId = req.params.id;
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

