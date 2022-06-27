import { Express, Request, Response, Router } from "express";
import { createMenuHandler, deleteMenuHandler, getAllMenuHandler, getMenuHandler, updateMenuHandler } from "../Controllers/Menu.controller";


const router = Router();

router.get("/",getAllMenuHandler);

router.post("/update",createMenuHandler);

router.get("/:id", getMenuHandler);

router.delete("/update/:id", deleteMenuHandler);

router.put("/update/:id", updateMenuHandler);

export default router;