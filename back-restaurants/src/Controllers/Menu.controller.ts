import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createMenu, deleteMenu, findAndUpdateMenu, findMenu } from '../service/menu.service';
import { IDeleteMenuReq, IGetMenuReq, IUpdateMenuReq } from '../types/menu';
import MenuModel from "../Models/Menu.model";
import mongoose, { Schema, Document, Types } from "mongoose"

export async function createMenuHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const menu = await createMenu(body);
  
  return res.send(menu);
}

export async function updateMenuHandler(
  req: Request,
  res: Response
) {
  
  const menuId = new mongoose.Types.ObjectId(req.params.id)
  const body = req.body;

  const menu = await findMenu(menuId);

  if(!menu) {
    return res.sendStatus(404);
  }

  const updatedMenu = await findAndUpdateMenu({menuId}, body, {new: true});

  return res.send(updatedMenu);
}

export async function getMenuHandler(
  req: Request,
  res: Response
) {
  const menuId = new mongoose.Types.ObjectId(req.params.id)
  const menu = await findMenu(menuId);

  if (!menu) {
    return res.sendStatus(404);
  }

  return res.send(menu);
}

export async function deleteMenuHandler(
  req: Request,
  res: Response
) {
  const menuId = new mongoose.Types.ObjectId(req.params.id)
  const menu = await findMenu(menuId);

  if (!menu) {
    return res.sendStatus(404);
  }
  await deleteMenu({_id: menuId});

  return res.send(menu);
}

export async function getAllMenuHandler(
  req: Request,
  res: Response
) {
  const menus = await MenuModel.find({});
  return res.send(menus);
}

