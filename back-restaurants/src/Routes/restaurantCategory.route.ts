import { Express, Request, Response, Router } from "express";
import { createRestaurantCategoryHandler, deleteRestaurantCategoryHandler, getAllRestaurantCategoryHandler, getRestaurantCategoryHandler, updateRestaurantCategoryHandler } from "../Controllers/RestaurantCategory.controller";

const router = Router();

router.get("/",getAllRestaurantCategoryHandler);

router.post("/update",createRestaurantCategoryHandler);

router.get("/:id", getRestaurantCategoryHandler);

router.delete("/update/:id", deleteRestaurantCategoryHandler);

router.put("/update/:id", updateRestaurantCategoryHandler);



export default router;