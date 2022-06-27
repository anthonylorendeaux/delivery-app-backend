import { Express, Request, Response, Router } from "express";
import { createArticleHandler, deleteArticleHandler, getAllArticleHandler, getArticleHandler, updateArticleHandler } from "../Controllers/Article.controller";

const router = Router();

router.get("/",getAllArticleHandler);

router.post("/update",createArticleHandler);

router.get("/:id", getArticleHandler);

router.delete("/update/:id", deleteArticleHandler);

router.put("/update/:id", updateArticleHandler);

export default router;