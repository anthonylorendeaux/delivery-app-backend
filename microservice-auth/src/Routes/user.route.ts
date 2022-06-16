import { Express, Request, Response, Router } from "express";
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserHandler, updateUserHandler} from "../Controllers/User.controller"


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
 * '/api/v1/users':
 *  get:
 *     tags: [User]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema: 
 *              $ref: '#/components/schema/User'
*/
router.get("/users", getAllUsersHandler);

/**
 * @openapi
 * '/api/v1/user/{id}':
 *  get:
 *     tags: [User]
 *     summary: Get a user by id
 *     parameters:
 *      - in: path
 *        name: id
 *        description: User id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema: 
 *              $ref: '#/components/schema/User'
 *       404:
 *          description: User not found
*/
router.get("/user/:id", getUserHandler);

/**
 * @openapi
 * '/api/v1/users':
 *  post:
 *     tags: [User]
 *     summary: Create a new user
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
router.post("/user",createUserHandler);

/**
 * @openapi
 *  /user/{id}:
 *    delete:
 *      summary: Delete a user by id
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The user was not found
 */
router.delete("/user/:id", deleteUserHandler);

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: update a user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/User'
 *     responses:
 *       200:
 *         decsription: The user was succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/User'
 *       404:
 *         description: User was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.put("/user/:id", updateUserHandler);


export default router;