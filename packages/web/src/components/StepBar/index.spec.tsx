import { TranslationKey } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import StepBar from "./index";
import { ComponentProps } from "react";
import { Steps as AntSteps } from "antd";
import Step from "../Step";

jest.mock("antd", () => ({
	Steps: ({ children }: ComponentProps<typeof AntSteps>) => (
		<div>{children}</div>
	),
}));

jest.mock("../Step", () => ({
	__esModule: true,
	default: ({
		isActive,
		stepIndex,
		isLastStep,
		title,
		isFinished,
	}: ComponentProps<typeof Step>) => (
		<div data-testid="step">
			{isActive ? "is active" : ""} {stepIndex}{" "}
			{isLastStep ? "last step" : ""} {title}{" "}
			{isFinished ? "is finished" : ""}
		</div>
	),
}));

describe("StepBar", () => {
	it("should render without errors", () => {
		render(
			<StepBar
				currentIndex={0}
				steps={["signInPage.signInForm.emailInputPlaceholder"]}
			/>
		);
	});

	it("should render 3 Step components if three steps are provided", () => {
		const steps: TranslationKey[] = [
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
		];

		render(<StepBar currentIndex={0} steps={steps} />);

		const stepComponents = screen.getAllByTestId("step");

		expect(stepComponents).toHaveLength(3);
	});

	it("should render only 1 active component", () => {
		const steps: TranslationKey[] = [
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
		];

		render(<StepBar currentIndex={1} steps={steps} />);

		const stepComponents = screen.getAllByTestId("step");
		expect(stepComponents[0]).not.toHaveTextContent("is active");
		expect(stepComponents[1]).toHaveTextContent("is active");
		expect(stepComponents[2]).not.toHaveTextContent("is active");
	});

	it("should pass isFinished prop true for step components rendered before current step", () => {
		const steps: TranslationKey[] = [
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
		];

		render(<StepBar currentIndex={1} steps={steps} />);

		const stepComponents = screen.getAllByTestId("step");
		expect(stepComponents[0]).toHaveTextContent("is finished");
		expect(stepComponents[1]).not.toHaveTextContent("is finished");
		expect(stepComponents[2]).not.toHaveTextContent("is finished");
	});

	it("should render only 1 last step component", () => {
		const steps: TranslationKey[] = [
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
			"signInPage.signInForm.emailInputPlaceholder",
		];

		render(<StepBar currentIndex={2} steps={steps} />);

		const stepComponents = screen.getAllByTestId("step");
		expect(stepComponents[0]).not.toHaveTextContent("last step");
		expect(stepComponents[1]).not.toHaveTextContent("last step");
		expect(stepComponents[2]).toHaveTextContent("last step");
	});
});
