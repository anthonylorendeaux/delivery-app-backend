import { Express, Request, Response, Router } from "express";
import { createArticleHandler, deleteArticleHandler, getAllArticleHandler, getArticleHandler, updateArticleHandler } from "../Controllers/Article.controller";
import { restaurantUpdateMiddleware } from "../middleware/restaurantUpdateMiddleware";

const router = Router();

router.get("/",getAllArticleHandler);

router.post("/update",restaurantUpdateMiddleware ,createArticleHandler);

router.get("/:id", getArticleHandler);

router.delete("/update/:id", restaurantUpdateMiddleware,deleteArticleHandler);

router.put("/update/:id", restaurantUpdateMiddleware,updateArticleHandler);

export default router;