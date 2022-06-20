import { Express, Request, Response, Router } from "express";
import { createRestaurantCategoryHandler, deleteRestaurantCategoryHandler, getAllRestaurantCategoryHandler, getRestaurantCategoryHandler, updateRestaurantCategoryHandler } from "../Controllers/RestaurantCategory.controller";

const router = Router();

router.get("/",getAllRestaurantCategoryHandler);

router.post("/",createRestaurantCategoryHandler);

router.get("/:id", getRestaurantCategoryHandler);

router.delete("/:id", deleteRestaurantCategoryHandler);

router.put("/:id", updateRestaurantCategoryHandler);



export default router;