import AboutMenu from ".";
import { render, screen } from "@testing-library/react";
import { LinkProps, Router } from "react-router-dom";
import { ComponentProps, ReactNode } from "react";
import Text from "../../../components/Text";

jest.mock("react-router-dom", () => ({
	Router: ({
		children,
	}: ComponentProps<typeof Router> & { children: ReactNode }) => (
		<>{children}</>
	),
	Link: ({ to }: LinkProps) => (
		<>
			<div>{to}</div>
		</>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("AboutMenu", () => {
	it("should render without errors", () => {
		render(<AboutMenu />);
	});

	it("should have all 3 paths present in link array", () => {
		render(<AboutMenu />);
		expect(screen.queryByText("/about/contact-us")).toBeInTheDocument();
		expect(screen.queryByText("/about/terms-of-use")).toBeInTheDocument();
		expect(screen.queryByText("/about/privacy-policy")).toBeInTheDocument();
	});
});
