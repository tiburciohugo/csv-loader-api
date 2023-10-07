import { Request, Response } from "express";
import multer from "multer";
import * as csv from "fast-csv";
import { User } from "../models/User";
import { CsvData } from "../types";
import { PassThrough } from "stream";

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });

export async function processCsvData(req: Request, res: Response) {
    try {
        const csvData: CsvData[] = [];
        const bufferStream = new PassThrough();
        bufferStream.end(req.file.buffer);

        bufferStream
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                console.error(error);
                throw error.message;
            })
            .on("data", (data: CsvData) => {
                csvData.push(data);
                console.log(data);
            })
            .on("end", async () => {
                const userInstances = csvData.map((data) => {
                    return {
                        name: data.name,
                        city: data.city,
                        country: data.country,
                        favorite_sport: data.favorite_sport
                    };
                });

                try {
                    User.bulkCreate(userInstances).then(() => {
                        const result = {
                            status: 200,
                            filename: req.file.originalname,
                            message: "Upload successful!"
                        };

                        res.json(result);
                    });
                } catch (error) {
                    res.status(500).json({
                        status: "error",
                        message: "Error uploading to the database."
                    });
                }
            });
    } catch (error) {
        console.error("Error while processing CSV data:", error.message);
        res.status(500).json({
            status: "error",
            message: `Error processing CSV data: ${error.message}`
        });
    }
}
