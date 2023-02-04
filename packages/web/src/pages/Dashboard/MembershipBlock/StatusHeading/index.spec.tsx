import StatusHeading from ".";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("StatusHeading", () => {
	it("should render without errors", () => {
		render(<StatusHeading />);
	});

	it("should render text YOUR STATUS", () => {
		render(<StatusHeading />);

		const yourSatusText = screen.getByText(
			"dashboardPage.membershipDetails.yourStatus"
		);
		expect(yourSatusText).toBeInTheDocument();
	});

	it("should receive correct className prop", () => {
		render(<StatusHeading className="status-heading-class" />);

		const className = screen.getByText(
			"dashboardPage.membershipDetails.yourStatus"
		);
		expect(className).toHaveClass("status-heading-class");
	});
});
