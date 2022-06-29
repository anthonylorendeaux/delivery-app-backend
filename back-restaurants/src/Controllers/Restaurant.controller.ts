import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createRestaurant, deleteRestaurant, findAllRestaurants, findAndUpdateRestaurant, findRestaurant } from "../service/restaurant.service";
import { IDeleteRestaurantReq, IGetRestaurantReq, IUpdateRestaurantReq } from "../types/restaurant";
import RestaurantModel from "../Models/Restaurant.model";
import ArticleModel from "../Models/Article.model";
import mongoose, { Schema, Document, Types } from "mongoose"

  export async function createRestaurantHandler(
    req: Request,
    res: Response
  ) {
    const body = req.body;

  const restaurant = await createRestaurant(body);
  return res.send(restaurant);
}

export async function updateRestaurantHandler(
  req: Request,
  res: Response
) {
  
  const restaurantId = new mongoose.Types.ObjectId(req.params.id)
  const body = req.body;

  const restaurant = await findRestaurant(restaurantId);

  if(!restaurant) {
    return res.sendStatus(404);
  }

  const updatedRestaurant = await findAndUpdateRestaurant({restaurantId}, body, {new: true});

  return res.send(updatedRestaurant);
}

export async function getRestaurantHandler(
  req: Request,
  res: Response
) {
  const restaurantId = new mongoose.Types.ObjectId(req.params.id)
  const restaurant = await findRestaurant(restaurantId);

  if (!restaurant) {
    return res.sendStatus(404);
  }

  

  return res.send(restaurant);
}

export async function deleteRestaurantHandler(
  req: Request,
  res: Response
) {
  const restaurantId = new mongoose.Types.ObjectId(req.params.id)
  const restaurant = await findRestaurant(restaurantId);

  if (!restaurant) {
    return res.sendStatus(404);
  }
  await deleteRestaurant({_id: restaurantId});

  return res.send(restaurant);
}

export async function getAllRestaurantHandler(
  req: Request,
  res: Response
) {
  const restaurants = await findAllRestaurants();
  return res.send(restaurants);
}

