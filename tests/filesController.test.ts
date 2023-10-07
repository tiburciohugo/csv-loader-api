import { Request, Response } from "express";
import { postFiles } from "../controllers/filesController";
import { processCsvData } from "../utils/upload";

jest.mock("../utils/upload", () => ({
    processCsvData: jest.fn()
}));

describe("filesController", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockReq = {
            file: {
                originalname: "sample.csv",
                buffer: Buffer.from("some csv data")
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if no file is uploaded", async () => {
        mockReq.file = undefined;

        await postFiles(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith("No file uploaded!");
    });

    it("should call processCsvData and respond appropriately on success", async () => {
        (processCsvData as jest.MockedFunction<any>).mockResolvedValueOnce({});

        await postFiles(mockReq as Request, mockRes as Response);

        expect(processCsvData).toHaveBeenCalledWith(mockReq, mockRes);
    });

    it("should handle errors thrown during file processing", async () => {
        const error = new Error("Upload failed");
        (processCsvData as jest.MockedFunction<any>).mockRejectedValueOnce(
            error
        );

        await postFiles(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith(
            "Error while uploading file to the server!"
        );
    });
});
