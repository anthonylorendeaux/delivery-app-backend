import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createOrder, deleteOrder, findAndUpdateOrder, findOrder, findOrdersByCustomerId, findOrdersByStatus } from '../service/Order.service';
import { ICreateOrderReq, IGetOrderReq, IUpdateOrderReq,IDeleteOrderReq } from '../types/Order';
import OrderModel from "../Models/Order.model";
import mongoose, { Schema, Document, Types } from "mongoose"

export async function createOrderHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const delivery = await createOrder(body);
  // Sockets
  const socket = req.app.get('io');
  if(delivery) {
      socket.emit('client', {delivery});
  }

  return res.send(delivery);
}

export async function updateOrderHandler(
  req: Request,
  res: Response
) {
  const orderId = new mongoose.Types.ObjectId(req.params.id);
  const body = req.body;

  const order = await findOrder(orderId);

  if(!order) {
    return res.sendStatus(404);
  }
  const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, body, {new: true});
  Logger.warn(updatedOrder)
  // Sockets
  const socket = req.app.get('io');
  if(updatedOrder) {
    if(updatedOrder.status === 'preparating') {
      socket.emit('delivery', {updatedOrder});
    }
    if(updatedOrder.status === 'accepted') {
      socket.emit(`restaurants`, {updatedOrder});
    }
    socket.emit('client', {updatedOrder});
  }

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

export async function getOrderByStatus(req: Request, res: Response) {
  const status = req.params.status;
  const orders = await findOrdersByStatus(status);
  return res.send(orders);
}

export async function getOrderByCustomerId(req: Request, res: Response) {
  Logger.warn(req.params.customerId);
  const customerId = String(req.params.customerId);
  const orders = await findOrdersByCustomerId(customerId);
  return res.send(orders);
}

