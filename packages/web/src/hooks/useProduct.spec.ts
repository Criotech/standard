import { renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import {
	ProductService,
	ISampleProduct,
} from "@myacuvue_thailand_web/services";
import { useTranslation } from "./useTranslation";
import { useProduct } from "./useProduct";

jest.mock("./useTranslation", () => ({
	useTranslation: jest.fn(),
}));
jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));
jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	ProductService: {
		getSampleProducts: jest.fn(),
	},
}));

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});

	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});

	mocked(useLoading).mockReturnValue({
		isLoading: false,
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});
});

describe("getProducts", () => {
	it("should call ProductService.getSampleProducts with correct arguments and return it", async () => {
		const expectedResponse: ISampleProduct[] = [
			{
				imageUrl: "fakeUrl",
				name: "fakeProductName",
				category: "BEAUTY",
				description: "Daily, 30 lenses/box",
				points: 150,
			},
		];

		mocked(ProductService.getSampleProducts).mockResolvedValue(
			expectedResponse
		);

		const { result } = renderHook(() => useProduct());
		const response = await result.current.getProducts();

		const language = "en";
		const region = "THA";
		expect(ProductService.getSampleProducts).toHaveBeenCalledWith(
			language,
			region,
			"fake-session-token"
		);
		expect(response).toEqual(expectedResponse);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();
		const { result } = renderHook(() => useProduct());
		await result.current.getProducts();

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
