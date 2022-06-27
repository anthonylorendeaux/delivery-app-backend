import { Request, Response, Router } from "express";
import {adminPermissionHandler, cdnPermissionHandler, clientPermissionHandler, orderPermissionHandler, restaurantsUpdatePermissionHandler} from "../Controllers/Permission.controller";

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

router.get("/restaurants:update", restaurantsUpdatePermissionHandler)

router.get("/cdn", cdnPermissionHandler)

router.get("/order", orderPermissionHandler)

router.get("/admin", adminPermissionHandler)

router.get("/client", clientPermissionHandler)

export default router;