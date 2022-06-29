import { Express, Request, Response, Router } from "express";
import { createArticleCategoryHandler, deleteArticleCategoryHandler, getAllArticleCategoryHandler, getArticleCategoryHandler, updateArticleCategoryHandler } from "../Controllers/ArticleCategory.controller";
import { restaurantUpdateMiddleware } from "../middleware/restaurantUpdateMiddleware";

const router = Router();

router.get("/",getAllArticleCategoryHandler);

router.post("/update", restaurantUpdateMiddleware,createArticleCategoryHandler);

router.get("/:id", getArticleCategoryHandler);

router.delete("/update/:id", restaurantUpdateMiddleware,deleteArticleCategoryHandler);

router.put("/update/:id", restaurantUpdateMiddleware,updateArticleCategoryHandler);


export default router;