import { Express, Router} from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/", userRoutes);

export default router;