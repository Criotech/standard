import { render, screen } from "@testing-library/react";
import MyAcuvueLiteHeader from ".";
import { useWideScreen } from "../../../hooks/useWideScreen";

jest.mock("../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("./SmallHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="small-header" />,
}));

jest.mock("./WideHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="wide-header" />,
}));

describe("MyAcuvueLiteHeader", () => {
	beforeEach(() => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});
	});

	it("should render without errors", () => {
		render(<MyAcuvueLiteHeader />);
	});

	it("should render WideHeader when it is wide screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		render(<MyAcuvueLiteHeader />);

		const wideHeader = screen.getByTestId("wide-header");
		expect(wideHeader).toBeInTheDocument();
	});

	describe("should render SmallHeader when it is not wide screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(<MyAcuvueLiteHeader />);

		const smallHeader = screen.getByTestId("small-header");
		expect(smallHeader).toBeInTheDocument();
	});
});
