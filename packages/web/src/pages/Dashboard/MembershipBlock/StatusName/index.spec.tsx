import StatusName from ".";
import { render, screen } from "@testing-library/react";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("StatusName", () => {
	it("should render without errors", () => {
		render(<StatusName statusKey="membershipPage.member" />);
	});

	it("should receive correct statusKey prop", () => {
		render(<StatusName statusKey="membershipPage.member" />);

		const statusKey = screen.getByText("membershipPage.member");
		expect(statusKey).toBeInTheDocument();
	});

	it("should receive correct className prop", () => {
		render(
			<StatusName
				statusKey="membershipPage.member"
				className="status-name-class"
			/>
		);

		const className = screen.getByText("membershipPage.member");
		expect(className).toHaveClass("status-name-class");
	});
});
