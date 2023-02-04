import { render, screen } from "@testing-library/react";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import StoreWithPinCard from "./index";

jest.mock("../../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("./StoreWithPinCardSmall", () => ({
	__esModule: true,
	default: () => <span data-testid="store-with-pin-card-small" />,
}));

jest.mock("./StoreWithPinCardWide", () => ({
	__esModule: true,
	default: () => <span data-testid="store-with-pin-card-wide" />,
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: true,
	});
});

describe("MembershipBlock", () => {
	it("should render without error", () => {
		render(
			<StoreWithPinCard
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);
	});

	it("should render wide view on wide screen", () => {
		render(
			<StoreWithPinCard
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		const StoreWithPinCardWide = screen.getByTestId(
			"store-with-pin-card-wide"
		);
		expect(StoreWithPinCardWide).toBeInTheDocument();
	});

	it("should render small view on small screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(
			<StoreWithPinCard
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		const storeWithPinCardSmall = screen.getByTestId(
			"store-with-pin-card-small"
		);
		expect(storeWithPinCardSmall).toBeInTheDocument();
	});
});
