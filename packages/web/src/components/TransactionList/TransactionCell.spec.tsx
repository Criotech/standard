import { render, screen } from "@testing-library/react";
import TransactionCell from "./TransactionCell";
import { ITransaction } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import { ComponentProps } from "react";

const transaction: ITransaction = {
	id: "12213",
	timestamp: 1210981217,
	description: ["fakeDescription"],
	pointsOscillation: +40,
};

const mockFormat = jest.fn();
jest.mock("moment", () => {
	const moment = () => ({
		format: mockFormat,
	});
	return moment;
});

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <div>{textKey}</div>,
}));

describe("TransactionCell", () => {
	beforeEach(() => {
		mockFormat.mockReturnValue("17/08/2021 23:04");
	});

	it("should render without errors", () => {
		render(<TransactionCell transaction={transaction} />);
	});

	it("should render description", () => {
		render(<TransactionCell transaction={transaction} />);
		const transactionDescription = screen.getByText("fakeDescription");
		expect(transactionDescription).toBeInTheDocument();
	});

	it("should render pointsOscillation with redeemed-points class", () => {
		const transaction: ITransaction = {
			id: "12213",
			timestamp: 1210981217,
			description: ["fakeDescription"],
			pointsOscillation: -40,
		};
		render(<TransactionCell transaction={transaction} />);
		const transactionPoints = screen.getByText("-40");
		expect(transactionPoints).toHaveClass("redeemed-points");
		expect(transactionPoints).not.toHaveClass("earned-points");
	});

	it("should render pointsOscillation with earned-points class", () => {
		const transaction: ITransaction = {
			id: "12213",
			timestamp: 1210981217,
			description: ["fakeDescription"],
			pointsOscillation: 40,
		};
		render(<TransactionCell transaction={transaction} />);

		const transactionPoints = screen.getByText("+40");
		expect(transactionPoints).toHaveClass("earned-points");
		expect(transactionPoints).not.toHaveClass("redeemed-points");
	});

	it("should have the 'earned' text in the screen for transaction with positive points", () => {
		const transaction: ITransaction = {
			id: "12213",
			timestamp: 1210981217,
			description: ["fakeDescription"],
			pointsOscillation: 40,
		};
		render(<TransactionCell transaction={transaction} />);

		const earnedPoints = screen.getByText(
			"pointsPage.transactionCell.earned"
		);
		expect(earnedPoints).toBeInTheDocument();
		const redeemedPoints = screen.queryByText(
			"pointsPage.transactionCell.redeemed"
		);
		expect(redeemedPoints).not.toBeInTheDocument();
	});

	it("should have the 'redeemed' text in the screen for transaction with negative points", () => {
		const transaction: ITransaction = {
			id: "12213",
			timestamp: 1210981217,
			description: ["fakeDescription"],
			pointsOscillation: -40,
		};
		render(<TransactionCell transaction={transaction} />);

		const redeemedPoints = screen.getByText(
			"pointsPage.transactionCell.redeemed"
		);
		expect(redeemedPoints).toBeInTheDocument();
		const earnedPoints = screen.queryByText(
			"pointsPage.transactionCell.earned"
		);
		expect(earnedPoints).not.toBeInTheDocument();
	});

	it("should render the formatted date", () => {
		const someFormattedDate = "17/08/2021 00:04";
		mockFormat.mockReturnValue(someFormattedDate);
		render(<TransactionCell transaction={transaction} />);

		expect(mockFormat).toHaveBeenCalledWith("DD/MM/YYYY hh:mm");

		const formattedDate = screen.getByText(someFormattedDate);
		expect(formattedDate).toBeInTheDocument();
	});
});
