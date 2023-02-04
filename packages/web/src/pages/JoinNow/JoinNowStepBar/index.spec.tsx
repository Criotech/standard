import { TranslationKey } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import JoinNowStepBar from ".";
import { ComponentProps } from "react";
import StepBar from "../../../components/StepBar";

jest.mock("../../../components/StepBar", () => ({
	__esModule: true,
	default: ({ steps, currentIndex }: ComponentProps<typeof StepBar>) => (
		<div data-testid="step-bar">
			<div data-testid="current-index">{currentIndex}</div>
			<div data-testid="steps">{JSON.stringify(steps)}</div>
		</div>
	),
}));

describe("JoinNowStepBar", () => {
	it("should render without errors", () => {
		render(<JoinNowStepBar currentIndex={1} />);
	});

	it("should render step bar component", () => {
		render(<JoinNowStepBar currentIndex={1} />);

		const stepBar = screen.getByTestId("step-bar");
		expect(stepBar).toBeInTheDocument();
	});

	it("should pass the correct currentIndex value to StepBar component", () => {
		render(<JoinNowStepBar currentIndex={1} />);

		const currentIndex = screen.getByTestId("current-index");

		expect(currentIndex).toBeInTheDocument();
		expect(currentIndex).toHaveTextContent("1");
	});

	it("should pass 3 correct steps to StepBar component", () => {
		render(<JoinNowStepBar currentIndex={1} />);

		const steps = screen.getByTestId("steps");
		const fakeSteps: TranslationKey[] = [
			"joinNowPage.joinNowStepBar.mobileOtp",
			"joinNowPage.joinNowStepBar.termsAndConditions",
			"joinNowPage.joinNowStepBar.createAccount",
		];
		expect(steps).toHaveTextContent(JSON.stringify(fakeSteps));
	});
});
