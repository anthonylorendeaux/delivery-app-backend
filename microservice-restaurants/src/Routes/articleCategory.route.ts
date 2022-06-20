import { Express, Request, Response, Router } from "express";
import { createArticleCategoryHandler, deleteArticleCategoryHandler, getAllArticleCategoryHandler, getArticleCategoryHandler, updateArticleCategoryHandler } from "../Controllers/ArticleCategory.controller";


const router = Router();

router.get("/",getAllArticleCategoryHandler);

router.post("/",createArticleCategoryHandler);

router.get("/:id", getArticleCategoryHandler);

router.delete("/:id", deleteArticleCategoryHandler);

router.put("/:id", updateArticleCategoryHandler);


export default router;