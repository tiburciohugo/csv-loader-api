import { Request, Response, Router } from "express";
import { upload } from "../utils/upload";
import { postFiles } from "../controllers/filesController";
import { searchUsers } from "../controllers/usersController";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("Pong! 🏓");
});
router.post("/files", upload.single("file"), postFiles);
router.get("/users", searchUsers);

export default router;