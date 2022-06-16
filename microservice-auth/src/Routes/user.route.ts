import { Express, Request, Response, Router } from "express";
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserHandler, updateUserHandler} from "../Controllers/User.controller"


const router = Router();

/**
 * @openapi
 * /api/v1/microservice/healthcheck:
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
 * '/api/v1/microservice/products':
 *  post:
 *     tags:
 *     - Products
 *     summary: Create a new product
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:  
 *        schema: 
 *          $ref: '#/components/schema/Product'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
*/
router.get("/users", getAllUsersHandler);

router.get("/user/:id", getUserHandler);

router.post("/user",createUserHandler);

router.delete("/user/:id", deleteUserHandler);

router.put("/user/:id", updateUserHandler);


export default router;