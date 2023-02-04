import { render } from "@testing-library/react";
import Step from ".";
import { ComponentProps } from "react";
import Text from "../Text";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("Step", () => {
	it("should render without errors", () => {
		render(
			<Step
				isFinished={false}
				isActive
				stepIndex={0}
				isLastStep={false}
				title="signInPage.signInForm.emailInputPlaceholder"
			/>
		);
	});

	it("should have acuvue-step-last in class name if isLastStep prop is true", () => {
		const { container } = render(
			<Step
				isFinished={false}
				isActive={true}
				stepIndex={0}
				isLastStep
				title="signInPage.signInForm.emailInputPlaceholder"
			/>
		);
		expect(container.firstChild).toHaveClass("acuvue-step-last");
	});

	it("should have acuvue-step-active in class name if active prop is true", () => {
		const { container } = render(
			<Step
				isFinished={false}
				isActive
				stepIndex={0}
				isLastStep={false}
				title="signInPage.signInForm.emailInputPlaceholder"
			/>
		);
		expect(container.firstChild).toHaveClass("acuvue-step-active");
	});

	it("should have acuvue-step-finished in class name if isFinished prop is true", () => {
		const { container } = render(
			<Step
				isFinished
				isActive={false}
				stepIndex={0}
				isLastStep
				title="signInPage.signInForm.emailInputPlaceholder"
			/>
		);
		expect(container.firstChild).toHaveClass("acuvue-step-finished");
	});

	it("should render stepIndex + 1", () => {
		const { container } = render(
			<Step
				isFinished
				isActive={false}
				stepIndex={0}
				isLastStep
				title="signInPage.signInForm.emailInputPlaceholder"
			/>
		);
		expect(container.getElementsByTagName("span")[0]).toHaveTextContent(
			"1"
		);
	});
});
