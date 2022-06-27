import { Express, Request, Response, Router } from "express";
import { createArticleCategoryHandler, deleteArticleCategoryHandler, getAllArticleCategoryHandler, getArticleCategoryHandler, updateArticleCategoryHandler } from "../Controllers/ArticleCategory.controller";


const router = Router();

router.get("/",getAllArticleCategoryHandler);

router.post("/update",createArticleCategoryHandler);

router.get("/:id", getArticleCategoryHandler);

router.delete("/update/:id", deleteArticleCategoryHandler);

router.put("/update/:id", updateArticleCategoryHandler);


export default router;