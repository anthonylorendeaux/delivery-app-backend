import { Express, Request, Response, Router } from "express";
import { createMenuHandler, deleteMenuHandler, getAllMenuHandler, getMenuHandler, updateMenuHandler } from "../Controllers/Menu.controller";
import { restaurantUpdateMiddleware } from "../middleware/restaurantUpdateMiddleware";

const router = Router();

router.get("/",getAllMenuHandler);

router.post("/update", restaurantUpdateMiddleware,createMenuHandler);

router.get("/:id", getMenuHandler);

router.delete("/update/:id",restaurantUpdateMiddleware, deleteMenuHandler);

router.put("/update/:id",restaurantUpdateMiddleware, updateMenuHandler);

export default router;