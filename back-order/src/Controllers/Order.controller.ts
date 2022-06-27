import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createOrder, deleteOrder, findAndUpdateOrder, findOrder } from '../service/Order.service';
import { ICreateOrderReq, IGetOrderReq, IUpdateOrderReq,IDeleteOrderReq } from '../types/Order';
import OrderModel from "../Models/Order.model";

export async function createOrderHandler(
  req: Request,
  res: Response
) {
  Logger.warn('COUCOU')
  const body = req.body;

  const delivery = await createOrder(body);
  
  return res.send(delivery);
}

export async function updateOrderHandler(
  req: IUpdateOrderReq,
  res: Response
) {
  
  const deliveryId = req.params.id;
  const body = req.body;

  const delivery = await findOrder(deliveryId);

  if(!delivery) {
    return res.sendStatus(404);
  }

  const updatedOrder = await findAndUpdateOrder({deliveryId}, body, {new: true});

  return res.send(updatedOrder);
}

export async function getOrderHandler(
  req: IGetOrderReq,
  res: Response
) {
  const deliveryId = req.params.id;
  const delivery = await findOrder(deliveryId);

  if (!delivery) {
    return res.sendStatus(404);
  }

  return res.send(delivery);
}

export async function deleteOrderHandler(
  req: IDeleteOrderReq,
  res: Response
) {
  const deliveryId = req.params.id;
  const delivery = await findOrder(deliveryId);

  if (!delivery) {
    return res.sendStatus(404);
  }
  await deleteOrder({_id: deliveryId});

  return res.send(delivery);
}

export async function getAllOrderHandler(
  req: Request,
  res: Response
) {
  const deliveries = await OrderModel.find({});
  return res.send(deliveries);
}

