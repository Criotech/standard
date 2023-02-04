import { renderHook, act } from "@testing-library/react-hooks";
import { useTransaction } from "./useTransaction";
import { useLoading } from "./useLoading";
import { useAuthentication } from "./useAuthentication";
import { TransactionService } from "@myacuvue_thailand_web/services";
import { ITransaction } from "@myacuvue_thailand_web/services/src/TransactionService/ITransaction";

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	TransactionService: {
		getTransactions: jest.fn(),
	},
}));

const expectedTransactions: ITransaction = {
	id: "id",
	description: ["desc"],
	pointsOscillation: 40,
	timestamp: 579348674,
};

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});

	(TransactionService.getTransactions as jest.Mock).mockReturnValue({
		transactions: expectedTransactions,
	});
});

describe("getTransactions", () => {
	it("should call service's getTransactions with correct parameters", async () => {
		const { result } = renderHook(() => useTransaction());

		await act(async () => {
			await result.current.getTransactions();
		});

		expect(TransactionService.getTransactions).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});

	it("should return expected transaction", async () => {
		const { result } = renderHook(() => useTransaction());

		const response = await result.current.getTransactions();

		expect(TransactionService.getTransactions).toHaveBeenCalledWith(
			"fake-session-token"
		);
		expect(response).toEqual(expectedTransactions);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useTransaction());

		await act(async () => {
			await result.current.getTransactions();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
