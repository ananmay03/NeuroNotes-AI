import express, { Request, Response } from "express";
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
    res.send("Auth Route Working");
});

export default router;
