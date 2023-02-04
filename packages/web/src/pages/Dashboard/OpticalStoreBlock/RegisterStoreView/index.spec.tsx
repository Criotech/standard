import RegisterStoreView from ".";
import { render, screen } from "@testing-library/react";
import { useWideScreen } from "../../../../hooks/useWideScreen";

jest.mock("../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("./RegisterStoreViewSmall", () => ({
	__esModule: true,
	default: () => {
		return <div data-testid="register-store-view-small" />;
	},
}));

jest.mock("./RegisterStoreWideView", () => ({
	__esModule: true,
	default: () => {
		return <div data-testid="register-store-wide-view" />;
	},
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: false,
	});
});

describe("RegisterStoreView", () => {
	it("should render without errors", () => {
		render(<RegisterStoreView />);
	});

	it("should render RegisterStoreWideView when screen is wide", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		render(<RegisterStoreView />);

		const registerStoreWideView = screen.getByTestId(
			"register-store-wide-view"
		);
		expect(registerStoreWideView).toBeInTheDocument();
	});

	it("should render RegisterStoreViewSmall when it's not wide screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(<RegisterStoreView />);

		const registerStoreViewSmall = screen.getByTestId(
			"register-store-view-small"
		);
		expect(registerStoreViewSmall).toBeInTheDocument();
	});
});
