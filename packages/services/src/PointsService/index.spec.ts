import { HTTPService } from "../index";
import { getPoints } from "./index";

jest.mock("../index");

describe("PostsService", () => {
	it("should call get with correct parameters", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			successResponse: jest.fn(),
		});

		const fakeSessionToken = "fakeSessionTokenValue";
		await getPoints(fakeSessionToken);
		expect(HTTPService.get).toHaveBeenCalledWith(
			"points",
			fakeSessionToken
		);
	});
});
