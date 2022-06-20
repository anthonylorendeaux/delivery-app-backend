import { createArticleHandler, deleteArticleHandler, getAllArticleHandler, getArticleHandler, updateArticleHandler } from "../Controllers/Article.controller";
import { createMenuHandler, deleteMenuHandler, getAllMenuHandler, getMenuHandler, updateMenuHandler } from "../Controllers/Menu.controller";
import { createRestaurantHandler, deleteRestaurantHandler, getAllRestaurantHandler, getRestaurantHandler, updateRestaurantHandler } from "../Controllers/Restaurant.controller";
import { Express, Request, Response } from "express";
import Logger from "../utils/logger"
import { createArticleCategoryHandler, deleteArticleCategoryHandler, getAllArticleCategoryHandler, getArticleCategoryHandler, updateArticleCategoryHandler } from "../Controllers/ArticleCategory.controller";
import { createRestaurantCategoryHandler, getAllRestaurantCategoryHandler, getRestaurantCategoryHandler, updateRestaurantCategoryHandler } from "../Controllers/RestaurantCategory.controller";

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

  app.get("/api/v1/restaurants",getAllRestaurantHandler);

  app.post("/api/v1/restaurants",createRestaurantHandler);

  app.get("/api/v1/restaurants/:id", getRestaurantHandler);

  app.delete("/api/v1/restaurants/:id", deleteRestaurantHandler);

  app.put("/api/v1/restaurants/:id", updateRestaurantHandler);

/** ---------------------------------- Article Routes ------------------------------------------- */


  app.get("/api/v1/articles",getAllArticleHandler);

  app.post("/api/v1/articles",createArticleHandler);

  app.get("/api/v1/articles/:id", getArticleHandler);

  app.delete("/api/v1/articles/:id", deleteArticleHandler);

  app.put("/api/v1/articles/:id", updateArticleHandler);

/** ---------------------------------- Menu Routes ------------------------------------------- */

  app.get("/api/v1/menus",getAllMenuHandler);

  app.post("/api/v1/menus",createMenuHandler);

  app.get("/api/v1/menus/:id", getMenuHandler);

  app.delete("/api/v1/menus/:id", deleteMenuHandler);

  app.put("/api/v1/menus/:id", updateMenuHandler);

  /** ---------------------------------- Article Category Routes ------------------------------------------- */

  app.get("/api/v1/articleCategories",getAllArticleCategoryHandler);

  app.post("/api/v1/articleCategories",createArticleCategoryHandler);

  app.get("/api/v1/articleCategories/:id", getArticleCategoryHandler);

  app.delete("/api/v1/articleCategories/:id", deleteArticleCategoryHandler);

  app.put("/api/v1/articleCategories/:id", updateArticleCategoryHandler);

  /** ---------------------------------- Restaurant Category Routes ------------------------------------------- */

  app.get("/api/v1/restaurantCategories",getAllRestaurantCategoryHandler);

  app.post("/api/v1/restaurantCategories",createRestaurantCategoryHandler);

  app.get("/api/v1/restaurantCategories/:id", getRestaurantCategoryHandler);

  app.delete("/api/v1/restaurantCategories/:id", deleteArticleCategoryHandler);

  app.put("/api/v1/restaurantCategories/:id", updateRestaurantCategoryHandler);




}

export default routes;
