import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createRestaurantCategory, deleteRestaurantCategory, findAndUpdateRestaurantCategory, findRestaurantCategory } from "../service/restaurantCategory.service";
import { IDeleteRestaurantCategoryReq, IGetRestaurantCategoryReq, IUpdateRestaurantCategoryReq } from "../types/restaurantCategory";
import RestaurantCategoryModel from "../Models/RestaurantCategory.model";
import mongoose, { Schema, Document, Types } from "mongoose"

  export async function createRestaurantCategoryHandler(
    req: Request,
    res: Response
  ) {
    const body = req.body;

  const restaurantCategory = await createRestaurantCategory(body);
  
  return res.send(restaurantCategory);
}

export async function updateRestaurantCategoryHandler(
  req: Request,
  res: Response
) {
  
  const restaurantCategoryId = new mongoose.Types.ObjectId(req.params.id)
  const body = req.body;

  const restaurantCategory = await findRestaurantCategory(restaurantCategoryId);

  if(!restaurantCategory) {
    return res.sendStatus(404);
  }

  const updatedRestaurantCategory = await findAndUpdateRestaurantCategory({restaurantCategoryId}, body, {new: true});

  return res.send(updatedRestaurantCategory);
}

export async function getRestaurantCategoryHandler(
  req: Request,
  res: Response
) {
  const restaurantCategoryId = new mongoose.Types.ObjectId(req.params.id)
  const restaurantCategory = await findRestaurantCategory(restaurantCategoryId);

  if (!restaurantCategory) {
    return res.sendStatus(404);
  }

  return res.send(restaurantCategory);
}

export async function deleteRestaurantCategoryHandler(
  req: Request,
  res: Response
) {
  const restaurantCategoryId = new mongoose.Types.ObjectId(req.params.id)
  const restaurantCategory = await findRestaurantCategory(restaurantCategoryId);

  if (!restaurantCategory) {
    return res.sendStatus(404);
  }
  await deleteRestaurantCategory({_id: restaurantCategoryId});

  return res.send(restaurantCategory);
}

export async function getAllRestaurantCategoryHandler(
  req: Request,
  res: Response
) {
  const restaurantCategories = await RestaurantCategoryModel.find({});
  return res.send(restaurantCategories);
}

