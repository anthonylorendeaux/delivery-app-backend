import { Express, Request, Response, Router } from "express";
import { createRestaurantHandler, deleteRestaurantHandler, getAllRestaurantHandler, getRestaurantHandler, updateRestaurantHandler } from "../Controllers/Restaurant.controller";


const router = Router();
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

  router.get("/",getAllRestaurantHandler);

  router.post("/update",createRestaurantHandler);

  router.get("/:id", getRestaurantHandler);

  router.delete("/update/:id", deleteRestaurantHandler);

  router.put("/update/:id", updateRestaurantHandler);

export default router;