import { NextFunction, Request, Response, Router } from "express";
import { loginHandler, refreshTokenHandler, registerHandler} from "../Controllers/Auth.controller"
import Logger from "../utils/logger"
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/healthcheck", async (req: Request, res: Response) => {
    return res.sendStatus(200)
})

router.post("/register", registerHandler);

router.post("/login", loginHandler);

router.get("/token", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
        const tokenData = req.body.tokenData;
        Logger.debug(tokenData);
        res.send('Protected')
    });

router.get("/refresh", refreshTokenHandler)

export default router;