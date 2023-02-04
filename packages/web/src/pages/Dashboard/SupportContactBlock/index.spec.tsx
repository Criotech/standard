import SupportContactBlock from "./index";
import { render, screen } from "@testing-library/react";
import Text from "../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../icons/PersonWithHeadsetIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="person-with-headset-icon" />,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey, data }: ComponentProps<typeof Text>) => (
		<>
			<span data-testid="text-key">{textKey}</span>
			<span data-testid="phone">{data?.phone}</span>
			<span data-testid="email">{data?.emailAddress}</span>
			<span data-testid="operating-hours">{data?.operatingHours}</span>
		</>
	),
}));

describe("SupportContactBlock", () => {
	it("should render without errors", () => {
		render(<SupportContactBlock emailAddress="" phone="" />);
	});

	it("should render PersonWithHeadsetIcon component", () => {
		render(<SupportContactBlock emailAddress="" phone="" />);

		const personWithHeadsetIcon = screen.getByTestId(
			"person-with-headset-icon"
		);

		expect(personWithHeadsetIcon).toBeInTheDocument();
	});

	it("should render anchor tags with appropriate link to email", () => {
		render(
			<SupportContactBlock
				emailAddress="some-email@acuvue.com"
				phone=""
			/>
		);

		const links = screen.getAllByRole("link");

		expect(links).toHaveLength(1);

		expect(links[0]).toHaveAttribute(
			"href",
			"mailto:some-email@acuvue.com"
		);
	});

	it("should receive correct phone prop", () => {
		render(<SupportContactBlock emailAddress="" phone="1234 5678 90" />);

		const phoneNumber = screen.getByText("1234 5678 90");

		expect(phoneNumber).toBeInTheDocument();
	});

	it("should receive correct operating hours prop", () => {
		render(<SupportContactBlock emailAddress="" phone="" />);

		const operatingHours = screen.getByText(
			"dashboard.memberSupport.operatingHours"
		);

		expect(operatingHours).toBeInTheDocument();
	});
});
