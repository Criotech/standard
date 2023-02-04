import { render, screen } from "@testing-library/react";
import IconWithLink from "./index";
import Text from "../../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => (
		<span data-testid="text">{textKey}</span>
	),
}));

describe("IconWithLink", () => {
	it("should render without errors", () => {
		render(
			<IconWithLink
				link="fake-link"
				textKey="couponDetails.points"
				icon={<></>}
			/>
		);
	});

	it("should link to provided link prop", () => {
		render(
			<IconWithLink
				link="fake-link"
				textKey="couponDetails.points"
				icon={<></>}
			/>
		);
		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
	});

	it("should render provided text prop", () => {
		render(
			<IconWithLink
				link="fake-link"
				textKey="couponDetails.points"
				icon={<></>}
			/>
		);
		const text = screen.getByTestId("text");
		expect(text).toHaveTextContent("couponDetails.points");
	});

	it("should render provided icon", () => {
		render(
			<IconWithLink
				link={"fake-link"}
				textKey="couponDetails.points"
				icon={<span data-testid="fake-icon"></span>}
			/>
		);
		const fakeIconElement = screen.getByTestId("fake-icon");
		expect(fakeIconElement).toBeInTheDocument();
	});
});
