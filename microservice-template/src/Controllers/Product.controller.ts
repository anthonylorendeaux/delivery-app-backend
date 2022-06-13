import Product from '../Models/Product.model';
import { Request, Response } from "express";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";
import { IDeleteProductReq, IGetProductReq, IProduct, IUpdateProductReq } from "../types/product";
import Logger from '../utils/logger';

export async function createProductHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const product = await createProduct(body);
  
  return res.send(product);
}

export async function updateProductHandler(
  req: IUpdateProductReq,
  res: Response
) {
  
  const productId = req.params.id.toString();
  const body = req.body;

  const product = await findProduct(productId);

  if(!product) {
    return res.sendStatus(404);
  }

  const updatedProduct = await findAndUpdateProduct({productId}, body, {new: true});

  return res.send(updatedProduct);
}

export async function getProductHandler(
  req: IGetProductReq,
  res: Response
) {
  const productId = req.params.id.toString();
  const product = await findProduct(productId);

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function deleteProductHandler(
  req: IDeleteProductReq,
  res: Response
) {
  const productId = req.params.id.toString();
  const product = await findProduct(productId);

  if (!product) {
    return res.sendStatus(404);
  }
  await deleteProduct({ _id: productId });

  return res.send(productId);
}

export async function getAllProductHandler(
  req: Request,
  res: Response
) {
  const products = await Product.find({});
  return res.send(products);
}

