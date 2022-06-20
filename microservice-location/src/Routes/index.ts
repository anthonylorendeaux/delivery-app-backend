import { createLocationHandler, deleteLocationHandler, getAllLocationHandler, getLocationHandler, updateLocationHandler } from "../Controllers/Location.controller";
import { Express, Request, Response } from "express";
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
  
/** ---------------------------------- Restaurant Routes ------------------------------------------- */
 /**
   * @openapi
   * '/api/v1/microservice/restaurants':
   *  post:
   *     tags:
   *     - Restaurants
   *     summary: Get all restaurants
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:  
   *        schema: 
   *          $ref: '#/components/schema/Restaurants'
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

  app.get("/api/v1/microservice/locations",getAllLocationHandler);

  app.post("/api/v1/microservice/locations",createLocationHandler);

  app.get("/api/v1/microservice/locations/:id", getLocationHandler);

  app.delete("/api/v1/microservice/locations/:id", deleteLocationHandler);

  app.put("/api/v1/microservice/locations/:id", updateLocationHandler);


}

export default routes;
