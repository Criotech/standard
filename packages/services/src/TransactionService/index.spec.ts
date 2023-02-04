import { getTransactions } from "./index";
import { HTTPService } from "../index";

jest.mock("../index");

describe("getTransactions", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: null,
		});

		await getTransactions(fakeSessionToken);
		expect(HTTPService.get).toHaveBeenCalledWith(
			"transactions",
			fakeSessionToken
		);
	});

	it("should return a list of transactions", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse = {
			transactions: [
				{
					id: "1",
					timestamp: 23456789,
					description: "1-DAY ACUVUE DEFINE x2",
					pointsOscillation: 40,
				},
			],
		};
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedResponse,
		});

		const response = await getTransactions(fakeSessionToken);
		expect(response).toEqual(expectedResponse);
	});
});
