import { Express, Request, Response, Router } from "express";
import { createArticleHandler, deleteArticleHandler, getAllArticleHandler, getArticleHandler, updateArticleHandler } from "../Controllers/Article.controller";

const router = Router();

router.get("/",getAllArticleHandler);

router.post("/",createArticleHandler);

router.get("/:id", getArticleHandler);

router.delete("/:id", deleteArticleHandler);

router.put("/:id", updateArticleHandler);

export default router;