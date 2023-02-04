import TransactionList from "./index";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useTransaction } from "../../hooks/useTransaction";
import { DividerProps } from "antd";
import { Link } from "react-router-dom-v5-compat";
import { ComponentProps } from "react";
import Text from "../Text";
import { mocked } from "ts-jest/utils";

jest.mock("../../hooks/useTransaction");

jest.mock("./TransactionCell", () => ({
	__esModule: true,
	default: () => <div data-testid="transaction-cell" />,
}));

jest.mock("antd", () => ({
	Divider: ({ plain }: DividerProps) => (
		<div data-testid="divider">{plain ? "plain" : "not-plain"} </div>
	),
}));

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <div>{textKey}</div>,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ to }: ComponentProps<typeof Link>) => <div>{to}</div>,
}));

jest.mock("../LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

beforeEach(() => {
	mocked(useTransaction).mockReturnValue({
		getTransactions: jest.fn().mockResolvedValue([]),
	});
});

describe("TransactionList", () => {
	it("should render transactionCells same length as maximumNumberOfTransactions prop if maximumNumberOfTransactions is present", async () => {
		mocked(useTransaction().getTransactions).mockResolvedValue([
			{
				id: "6678",
				timestamp: 1628605635000,
				description: ["1-DAY ACUVUE DEFINE® x2"],
				pointsOscillation: 40,
			},
			{
				id: "5678",
				timestamp: 1625322435000,
				description: ["Welcome Coupon"],
				pointsOscillation: -100,
			},
			{
				id: "3786",
				timestamp: 1623508035000,
				description: ["ACUVUE Reward"],
				pointsOscillation: -100,
			},
		]);

		const maximumTransaction = 2;
		await act(async () => {
			render(
				<TransactionList
					maximumNumberOfTransactions={maximumTransaction}
				/>
			);
		});

		await waitFor(() => {
			const transactionCells =
				screen.queryAllByTestId("transaction-cell");
			expect(transactionCells).toHaveLength(maximumTransaction);
		});
	});

	it("should render transactionCells same length as transactions", async () => {
		mocked(useTransaction().getTransactions).mockResolvedValue([
			{
				id: "6678",
				timestamp: 1628605635000,
				description: ["1-DAY ACUVUE DEFINE® x2"],
				pointsOscillation: 40,
			},
			{
				id: "5678",
				timestamp: 1625322435000,
				description: ["Welcome Coupon"],
				pointsOscillation: -100,
			},
			{
				id: "3786",
				timestamp: 1623508035000,
				description: ["ACUVUE Reward"],
				pointsOscillation: -100,
			},
		]);

		await act(async () => {
			render(<TransactionList />);
		});

		await waitFor(() => {
			const transactionCells =
				screen.queryAllByTestId("transaction-cell");
			expect(transactionCells).toHaveLength(3);
		});
	});
});
