import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createArticleCategory, deleteArticleCategory, findAndUpdateArticleCategory, findArticleCategory } from '../service/articleCategory.service';
import { IDeleteArticleCategoryReq, IGetArticleCategoryReq, IUpdateArticleCategoryReq } from '../types/articleCategory';
import ArticleCategoryModel from "../Models/ArticleCategory.model";
import mongoose, { Schema, Document, Types } from "mongoose"

export async function createArticleCategoryHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const articleCategory = await createArticleCategory(body);
  
  return res.send(articleCategory);
}

export async function updateArticleCategoryHandler(
  req: Request,
  res: Response
) {
  
  const articleCategoryId = new mongoose.Types.ObjectId(req.params.id)
  const body = req.body;

  const articleCategory = await findArticleCategory(articleCategoryId);

  if(!articleCategory) {
    return res.sendStatus(404);
  }

  const updatedArticleCategory = await findAndUpdateArticleCategory({articleCategoryId}, body, {new: true});

  return res.send(updatedArticleCategory);
}

export async function getArticleCategoryHandler(
  req: Request,
  res: Response
) {
  const articleCategoryId = new mongoose.Types.ObjectId(req.params.id)
  const articleCategory = await findArticleCategory(articleCategoryId);

  if (!articleCategory) {
    return res.sendStatus(404);
  }

  return res.send(articleCategory);
}

export async function deleteArticleCategoryHandler(
  req: Request,
  res: Response
) {
  const articleCategoryId = new mongoose.Types.ObjectId(req.params.id)
  const articleCategory = await findArticleCategory(articleCategoryId);

  if (!articleCategory) {
    return res.sendStatus(404);
  }
  await deleteArticleCategory({_id: articleCategoryId});

  return res.send(articleCategory);
}

export async function getAllArticleCategoryHandler(
  req: Request,
  res: Response
) {
  const articleCategories = await ArticleCategoryModel.find({});
  return res.send(articleCategories);
}

