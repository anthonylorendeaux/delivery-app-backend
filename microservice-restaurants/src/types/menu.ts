import { Article, Menu } from "@prisma/client";
import {Request} from "express"
import { ObjectId } from "mongodb";
import { Document } from "mongoose"
import { IArticle } from "./article";

/**
 * @openapi
 * components:
 *   schema:
 *     Menu:
 *       type: object
 *       required:
 *        - article
 *        - total
 *       properties:
 *         article:
 *           type: Array<article>
 *         total:
 *           type: string
 */

export interface IMenu extends Document {
  id: ObjectId;
  articleIds: Array<ObjectId>;
  total: String;
  restaurantId: ObjectId;
}

export interface IGetMenuReq extends Request<{ id: IMenu['id']}> {}
export interface ICreateMenuReq extends Request<any, any,IMenu> {}
export interface IUpdateMenuReq extends Request <{id: IMenu['id']}, any, IMenu> {}
export interface IDeleteMenuReq extends Request <{ id: IMenu['id']}>{} 