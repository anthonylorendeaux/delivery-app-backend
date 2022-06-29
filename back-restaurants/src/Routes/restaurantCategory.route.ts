import { Express, Request, Response, Router } from "express";
import { createRestaurantCategoryHandler, deleteRestaurantCategoryHandler, getAllRestaurantCategoryHandler, getRestaurantCategoryHandler, updateRestaurantCategoryHandler } from "../Controllers/RestaurantCategory.controller";
import { restaurantUpdateMiddleware } from "../middleware/restaurantUpdateMiddleware";

const router = Router();

router.get("/",getAllRestaurantCategoryHandler);

router.post("/update", restaurantUpdateMiddleware,createRestaurantCategoryHandler);

router.get("/:id", getRestaurantCategoryHandler);

router.delete("/update/:id", restaurantUpdateMiddleware,deleteRestaurantCategoryHandler);

router.put("/update/:id",restaurantUpdateMiddleware, updateRestaurantCategoryHandler);

export default router;