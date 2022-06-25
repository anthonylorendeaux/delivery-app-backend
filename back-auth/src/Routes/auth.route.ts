import { NextFunction, Request, Response, Router } from "express";
import { disconnectUserHandler, loginHandler, refreshTokenHandler, registerHandler} from "../Controllers/Auth.controller"
import Logger from "../utils/logger"
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @openapi
 * /api/v1/user/healthcheck:
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

/**
 * @openapi
 * '/api/v1/auth/register':
 *  post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:  
 *        schema: 
 *          $ref: '#/components/schema/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *           $ref: '#/components/schema/User'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 * */
router.post("/register", registerHandler);

/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags: [Auth]
 *     summary: Login and get the tokens
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:  
 *        schema: 
 *          type: object
 *          properties:
 *           email:
 *              type: string
 *          password:
 *             type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                 token: 
 *                  type: string
 *                 refreshToken:    
 *                  type: string 
 *              description: JWT token   
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 * */
router.post("/login", loginHandler);

/**
 * @openapi
 * '/api/v1/auth/token':
 *  get:
 *     tags: [Auth]
 *     summary: Verify a token
 *     security:
 *          type: http
 *          scheme: bearer
 *     responses:
 *       200:
 *         description: Success
 * components:
 *  securitySchemes:
 *   BearerAuth:
 *    type: http
 *    scheme: bearer
*/
router.get("/token", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    Logger.info("Token request")
    const tokenData = req.body.tokenData;
    Logger.debug(tokenData);
    res.sendStatus(200);
});

/**
 * @openapi
 * '/api/v1/auth/refresh':
 *  get:
 *     tags: [Auth]
 *     summary: Get a new token
 *     security:
 *          type: http
 *          scheme: bearer
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *          description: Not authorized
 * components:
 *  securitySchemes:
 *   BearerAuth:
 *    type: http
 *    scheme: bearer
*/
router.get("/refresh", refreshTokenHandler)

router.get("/disconnect", disconnectUserHandler)

export default router;