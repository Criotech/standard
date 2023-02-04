import PointsTransactions from ".";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import Header from "../../../components/Layout/Header";

jest.mock("../../../components/TransactionList", () => ({
	__esModule: true,
	default: () => <div data-testid="transaction-list" />,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

describe("PointsTransactions", () => {
	it("should render without errors", () => {
		render(<PointsTransactions />);
	});

	it("should render TransactionList", async () => {
		render(<PointsTransactions />);
		const transactionList = screen.queryAllByTestId("transaction-list")[0];
		expect(transactionList).toBeInTheDocument();
	});

	it("should render text to show end of transaction list", async () => {
		render(<PointsTransactions />);
		const transactionListEnd = screen.getByText(
			"pointsPage.pointsTransactions.endOfTransaction"
		);
		expect(transactionListEnd).toBeInTheDocument();
	});

	it("should render masthead", async () => {
		render(<PointsTransactions />);
		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("pointsPage.transactionList.masthead");
	});

	it("should render global navigation panel", async () => {
		render(<PointsTransactions />);
		const globalNavigationPanel = screen.getByTestId(
			"global-navigation-panel"
		);
		expect(globalNavigationPanel).toBeInTheDocument();
	});
});
