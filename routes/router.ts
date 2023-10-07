import { Request, Response, Router } from "express";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("Pong! 🏓");
});
router.post("/files", () => {});
router.get("/users", () => {});

export default router;