import { render, screen } from "@testing-library/react";
import CheckListItem from ".";
import { ComponentProps } from "react";
import CheckmarkIcon from "../../icons/CheckmarkIcon";
import Text from "../Text";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../icons/CheckmarkIcon", () => ({
	__esModule: true,
	IconSize: {
		SMALL: "24px",
		MEDIUM: "48px",
	},
	default: ({ color }: ComponentProps<typeof CheckmarkIcon>) => (
		<span data-testid="checkmark-icon">{color}</span>
	),
}));

describe("CheckListItem", () => {
	const labelKey = "signinPage.signinForm.passwordInputLlabel";

	it("should render without errors", () => {
		render(<CheckListItem isCheckLit labelKey={labelKey} />);
	});

	it("should render labelKey", () => {
		render(<CheckListItem isCheckLit labelKey={labelKey} />);

		const labelText = screen.queryByText(labelKey);
		expect(labelText).toBeInTheDocument();
	});

	it("should render checkmark-icon", () => {
		render(<CheckListItem isCheckLit labelKey={labelKey} />);

		const checkmarkIcon = screen.getByTestId("checkmark-icon");
		expect(checkmarkIcon).toBeInTheDocument();
	});

	it("should render checkmark-icon with color #19a619 when isCheckLit", () => {
		render(<CheckListItem isCheckLit labelKey={labelKey} />);

		const checkmarkIcon = screen.getByTestId("checkmark-icon");
		expect(checkmarkIcon).toHaveTextContent("#19a619");
	});

	it("should render checkmark-icon with color #C2C7CC when isCheckLit is false", () => {
		render(<CheckListItem isCheckLit={false} labelKey={labelKey} />);

		const checkmarkIcon = screen.getByTestId("checkmark-icon");
		expect(checkmarkIcon).toHaveTextContent("#C2C7CC");
	});
});
