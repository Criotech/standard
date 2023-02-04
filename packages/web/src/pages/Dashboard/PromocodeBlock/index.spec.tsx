import { waitFor, act } from "@testing-library/react";
import PromocodeBlock from ".";
import { renderWithLanguage, screen } from "../../../test-utils";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { usePromocodeBlock } from "./usePromocodeBlock";
import { mocked } from "ts-jest/utils";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("./usePromocodeBlock", () => ({
	usePromocodeBlock: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: "yzbn",
	});
	mocked(usePromocodeBlock).mockReturnValue({
		isLoading: false,
		promo: {
			promocode: "123456",
			isTrialCompleted: true,
		},
		generatePromo: jest.fn(),
		errorMessage: undefined,
	});
});

describe("PromocodeBlock", () => {
	it("should render promocode block title text", async () => {
		await act(async () => {
			renderWithLanguage(<PromocodeBlock />);
		});

		await waitFor(() => {
			const blockTitle = screen.getByText("MyACUVUE® Club Membership");
			expect(blockTitle).toBeVisible();
		});
	});

	it("should render generate button text", async () => {
		await act(async () => {
			renderWithLanguage(<PromocodeBlock />);
		});

		await waitFor(() => {
			const generateButton = screen.getByText("GENERATE CODE");
			expect(generateButton).toBeVisible();
		});
	});

	it("should render share text if promocode isTrialCompleted is true", async () => {
		mocked(usePromocodeBlock).mockReturnValue({
			isLoading: false,
			promo: {
				promocode: "123456",
				isTrialCompleted: true,
			},
			generatePromo: jest.fn(),
			errorMessage: undefined,
		});

		await act(async () => {
			renderWithLanguage(<PromocodeBlock />);
		});

		await waitFor(() => {
			const shareText = screen.getByText(
				"You have already availed your free trial lenses. Use above code to get offer on your purchase"
			);
			expect(shareText).toBeVisible();
		});
	});

	it("should render share text if promocode isTrialCompleted is false", async () => {
		mocked(usePromocodeBlock).mockReturnValue({
			isLoading: false,
			promo: {
				promocode: "123456",
				isTrialCompleted: false,
			},
			generatePromo: jest.fn(),
			errorMessage: undefined,
		});

		await act(async () => {
			renderWithLanguage(<PromocodeBlock />);
		});

		await waitFor(() => {
			const shareText = screen.queryByText(
				"Share this code with your preferred store to get your free Acuvue trial lenses and purchase offer on Acuvue lenses"
			);
			expect(shareText).toBeVisible();
		});
	});

	it("should render bottom text", async () => {
		await act(async () => {
			renderWithLanguage(<PromocodeBlock />);
		});

		await waitFor(() => {
			const bottomText = screen.getByText(
				"Rs.100 Welcome Reward per box (Limit to 4 boxes per transaction). T&Cs apply."
			);
			expect(bottomText).toBeVisible();
		});
	});
});
