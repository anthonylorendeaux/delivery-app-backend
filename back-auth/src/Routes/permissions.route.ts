import { Request, Response, Router } from "express";
import {restaurantPermissionHandler} from "../Controllers/Permission.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/permissions/healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/healthcheck", async (req: Request, res: Response) => {
    return res.sendStatus(200)
})

router.get("/restaurant", restaurantPermissionHandler)



export default router;