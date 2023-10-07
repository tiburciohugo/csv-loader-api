import { Multer } from "multer";

export interface CsvData {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

declare global {
    namespace Express {
        interface Request {
            file: Multer.File;
        }
    }
}
