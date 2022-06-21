import { Request, Response } from "express";
import Logger from '../utils/logger';
import { createLocation, deleteLocation, findAndUpdateLocation, findLocation} from "../service/location.service";
import { IDeleteLocationReq, IGetLocationReq, IUpdateLocationReq } from "../types/location";
import LocationModel from "../Models/Location.model";

export async function createLocationHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const location = await createLocation(body);
  
  return res.send(location);
}

export async function updateLocationHandler(
  req: IUpdateLocationReq,
  res: Response
) {
  
  const locationId = req.params.id;
  const body = req.body;

  const location = await findLocation(locationId);

  if(!location) {
    return res.sendStatus(404);
  }

  const updatedLocation = await findAndUpdateLocation({locationId}, body, {new: true});

  return res.send(updatedLocation);
}

export async function getLocationHandler(
  req: IGetLocationReq,
  res: Response
) {
  const locationId = req.params.id;
  const location = await findLocation(locationId);

  if (!location) {
    return res.sendStatus(404);
  }

  return res.send(location);
}

export async function deleteLocationHandler(
  req: IDeleteLocationReq,
  res: Response
) {
  const locationId = req.params.id;
  const location = await findLocation(locationId);

  if (!location) {
    return res.sendStatus(404);
  }
  await deleteLocation({_id: locationId});

  return res.send(location);
}

export async function getAllLocationHandler(
  req: Request,
  res: Response
) {
  const locations = await LocationModel.find({});
  return res.send(locations);
}

