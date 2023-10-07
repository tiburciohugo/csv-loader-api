import { searchUsers } from "../controllers/usersController";
import { User } from "../models/User";

jest.mock("../models/User");

describe("searchUsers Controller", () => {
    let req: any, res: any;

    beforeEach(() => {
        req = {
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("returns a 400 if no search term is provided", async () => {
        await searchUsers(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Please provide a search term using the ?q= parameter."
        });
    });

    it("returns a 404 if no users match the search term", async () => {
        User.findAll = jest.fn().mockResolvedValue([]);
        req.query.q = "nonexistent";

        await searchUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: `No user found with name ${req.query.q}`
        });
    });

    it("returns users if they match the search term", async () => {
        const mockUsers = [{ id: 1, name: "John Doe" }];
        User.findAll = jest.fn().mockResolvedValue(mockUsers);
        req.query.q = "John";

        await searchUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("returns a 500 if there is a database error", async () => {
        const error = new Error("DB Error");
        User.findAll = jest.fn().mockRejectedValue(error);
        req.query.q = "John";

        await searchUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error while searching for users."
        });
    });
});
