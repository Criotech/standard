import { act, render, screen, waitFor } from "@testing-library/react";
import SampleProductCatalog from "./index";
import { useProduct } from "../../../hooks/useProduct";
import { ComponentProps } from "react";
import Button from "../../../components/Button";
import { mocked } from "ts-jest/utils";

jest.mock("../../../hooks/useText", () => ({ useText: jest.fn() }));

jest.mock("../../../components/Button", () => ({
	__esModule: true,
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
	},
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
	},
	default: ({ onClick }: ComponentProps<typeof Button>) => (
		<button data-testid="button" onClick={onClick} />
	),
}));

jest.mock("../../../hooks/useProduct", () => ({
	useProduct: jest.fn(),
}));

jest.mock("./ProductCell", () => ({
	__esModule: true,
	default: () => <div data-testid="product-cell">product-details</div>,
}));

jest.mock("../../../components/ThinDivider", () => ({
	__esModule: true,
	default: () => <span data-testid="thin-divider" />,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: () => jest.fn(),
}));

beforeEach(() => {
	mocked(useProduct).mockReturnValue({
		getProducts: jest.fn().mockResolvedValue([]),
	});
});

describe("SampleProductCatalog", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<SampleProductCatalog />);
		});
	});

	it("should render ProductCell if there are products", async () => {
		mocked(useProduct().getProducts).mockResolvedValue([
			{
				imageUrl: "fake-image-url",
				name: "fake product name",
				category: "fake category",
				description: "fake description",
				points: 25,
			},
		]);

		await act(async () => {
			render(<SampleProductCatalog />);
		});

		await waitFor(() => {
			const productCell = screen.getAllByTestId("product-cell")[0];
			expect(productCell).toBeVisible();
			expect(productCell).toHaveTextContent("product-details");
		});
	});

	it("should render button clickable", async () => {
		await act(async () => {
			render(<SampleProductCatalog />);
		});

		const goToPointButton = screen.getByTestId("button");
		goToPointButton.click();
	});
});
