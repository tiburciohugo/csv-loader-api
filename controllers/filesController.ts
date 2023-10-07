import { Request, Response } from "express";
import { processCsvData } from "../utils/upload";

export async function postFiles(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded!");
        }

        await processCsvData(req, res);
    } catch (error) {
        console.error("Error in the Files controller", error);
        return res
            .status(500)
            .send("Error while uploading file to the server!");
    }
}
