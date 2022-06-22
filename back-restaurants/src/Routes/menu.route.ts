import { Express, Request, Response, Router } from "express";
import { createMenuHandler, deleteMenuHandler, getAllMenuHandler, getMenuHandler, updateMenuHandler } from "../Controllers/Menu.controller";


const router = Router();

router.get("/",getAllMenuHandler);

router.post("/",createMenuHandler);

router.get("/:id", getMenuHandler);

router.delete("/:id", deleteMenuHandler);

router.put("/:id", updateMenuHandler);

export default router;