import { render, screen } from "@testing-library/react";
import Progress from "./index";
import { BadgeType } from "./types";
import { Progress as AntProgress } from "antd";
import { ComponentProps } from "react";

jest.mock("./NormalBadge", () => ({
	NormalBadge: () => <div data-testid="normal-badge" />,
}));

jest.mock("./PlatinumBadge", () => ({
	PlatinumBadge: () => <div data-testid="platinum-badge" />,
}));

jest.mock("antd", () => ({
	Progress: ({
		percent,
		className,
		format,
	}: ComponentProps<typeof AntProgress>) => (
		<div data-testid="fakeAntProgress" className={className}>
			<div data-testid="fakePercentProp">{percent}</div>
			{format !== undefined && <div data-testid="format">{format()}</div>}
		</div>
	),
}));

describe("Progress", () => {
	it("should render without errors", () => {
		render(<Progress />);
	});

	it("should send the attributes to the Progress component", () => {
		const percentValue = 75;
		render(<Progress percent={percentValue} />);
		const fakePercentProp = screen.getByTestId("fakePercentProp");
		expect(fakePercentProp).toBeInTheDocument();
		expect(fakePercentProp).toHaveTextContent(percentValue.toString());
	});

	it("should have default acuvue-progress class", () => {
		render(<Progress />);
		const progress = screen.getByTestId("fakeAntProgress");
		expect(progress).toHaveClass("acuvue-progress");
	});

	it("should have a custom class along with default class", () => {
		render(<Progress className="progress-custom-class" />);
		const progress = screen.getByTestId("fakeAntProgress");
		expect(progress).toHaveClass("acuvue-progress progress-custom-class");
	});

	it("should render normal badge inside progress if badge type is normal", () => {
		render(
			<Progress
				className="progress-custom-class"
				badge={BadgeType.NORMAL}
			/>
		);

		const normalBadge = screen.getByTestId("normal-badge");
		expect(normalBadge).toBeInTheDocument();
		const platinumBadge = screen.queryByTestId("platinum-badge");
		expect(platinumBadge).not.toBeInTheDocument();
	});

	it("should render platinum badge inside progress if badge type is platinum", () => {
		render(
			<Progress
				className="progress-custom-class"
				badge={BadgeType.PLATINUM}
			/>
		);

		const platinumBadge = screen.getByTestId("platinum-badge");
		expect(platinumBadge).toBeInTheDocument();

		const normalBadge = screen.queryByTestId("normal-badge");
		expect(normalBadge).not.toBeInTheDocument();
	});
});
