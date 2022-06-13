import { Express, Request, Response } from "express";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler, getAllProductHandler } from "../Controllers/Product.controller";
import Logger from "../utils/logger"

function routes(app: Express) {
  /**
   * @openapi
   * /api/v1/microservice/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/api/v1/microservice/healthcheck", async (req: Request, res: Response) => {
    return res.sendStatus(200)
  })

  /**
   * @openapi
   * '/api/v1/microservice/products':
   *  post:
   *     tags:
   *     - Products
   *     summary: Create a new product
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:  
   *        schema: 
   *          $ref: '#/components/schema/Product'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              
   *       409:
   *         description: Conflict
   *       400:
   *         description: Bad request
   */
  app.get("/api/v1/microservice/products",getAllProductHandler);

  app.post("/api/v1/microservice/products",createProductHandler);

  app.get("/api/v1/microservice/products/:id", getProductHandler);

  app.delete("/api/v1/microservice/products/:id", deleteProductHandler);

  app.put("/api/v1/microservice/products/:id", updateProductHandler);
}

export default routes;