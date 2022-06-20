import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createDelivery, deleteDelivery, findAndUpdateDelivery, findDelivery } from '../service/delivery.service';
import { ICreateDeliveryReq, IGetDeliveryReq, IUpdateDeliveryReq,IDeleteDeliveryReq } from '../types/delivery';
import DeliveryModel from "../Models/Delivery.model";

export async function createDeliveryHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const delivery = await createDelivery(body);
  
  return res.send(delivery);
}

export async function updateDeliveryHandler(
  req: IUpdateDeliveryReq,
  res: Response
) {
  
  const deliveryId = req.params.id;
  const body = req.body;

  const delivery = await findDelivery(deliveryId);

  if(!delivery) {
    return res.sendStatus(404);
  }

  const updatedDelivery = await findAndUpdateDelivery({deliveryId}, body, {new: true});

  return res.send(updatedDelivery);
}

export async function getDeliveryHandler(
  req: IGetDeliveryReq,
  res: Response
) {
  const deliveryId = req.params.id;
  const delivery = await findDelivery(deliveryId);

  if (!delivery) {
    return res.sendStatus(404);
  }

  return res.send(delivery);
}

export async function deleteDeliveryHandler(
  req: IDeleteDeliveryReq,
  res: Response
) {
  const deliveryId = req.params.id;
  const delivery = await findDelivery(deliveryId);

  if (!delivery) {
    return res.sendStatus(404);
  }
  await deleteDelivery({_id: deliveryId});

  return res.send(delivery);
}

export async function getAllDeliveryHandler(
  req: Request,
  res: Response
) {
  const deliveries = await DeliveryModel.find({});
  return res.send(deliveries);
}

