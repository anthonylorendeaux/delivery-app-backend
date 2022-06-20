import { Express, Request, Response, Router } from "express";
import Logger from "../utils/logger"
import restaurantRouter from "./restaurants.route";
import menuRouter from "./menu.route";
import articleRouter from "./article.route";
import articleCategoryRouter from "./articleCategory.route";
import restaurantCategoryRouter from "./restaurantCategory.route";

const router = Router();

router.use("/api/v1/restaurants", restaurantRouter);
router.use("/api/v1/articles", articleRouter);
router.use("/api/v1/menus", menuRouter);
router.use("/api/v1/articleCategories", articleCategoryRouter);
router.use("/api/v1/restaurantCategories", restaurantCategoryRouter);

export default router;
