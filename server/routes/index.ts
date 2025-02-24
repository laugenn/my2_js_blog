import express from "express";
import contentsRoutes from "./contents";
import loginRoutes from "./logins";

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/content", contentsRoutes);

export default router;
