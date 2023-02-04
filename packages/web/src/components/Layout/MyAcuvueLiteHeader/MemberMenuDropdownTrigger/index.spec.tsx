import { render, screen } from "@testing-library/react";
import MemberMenuDropdownTrigger from "./index";
import { ComponentProps } from "react";
import Text from "../../../Text";

jest.mock("../../../../icons/DropdownIcon", () => ({
	__esModule: true,
	IconSize: {
		MINI: "12px",
	},
	default: () => <span data-testid="dropdown-icon" />,
}));

jest.mock("../UserMenu", () => ({
	__esModule: true,
	default: () => <span data-testid="user-menu" />,
}));

jest.mock("../../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("MemberMenuDropdownTrigger", () => {
	it("should render without errors", () => {
		render(<MemberMenuDropdownTrigger name={""} />);
	});

	it("should render myacuvue icon", () => {
		render(<MemberMenuDropdownTrigger name={""} />);
		const myAcuvueIcon = screen.getAllByRole("img")[0];
		expect(myAcuvueIcon).toBeInTheDocument();
		expect(myAcuvueIcon).toHaveAttribute("alt", "MyAcuvue logo");
		expect(myAcuvueIcon).toHaveAttribute("src", "myacuvue-icon.png");
	});

	it("should render correct name", () => {
		render(<MemberMenuDropdownTrigger name={"fakeName"} />);
		const myAcuvueIcon = screen.getByText(
			"myacuvueLiteHeader.memberMenuDropdownTrigger.hello" + "fakeName"
		);
		expect(myAcuvueIcon).toBeInTheDocument();
	});

	it("should render dropdown-icon", () => {
		render(<MemberMenuDropdownTrigger name={""} />);

		const dropdownIcon = screen.getByTestId("dropdown-icon");
		expect(dropdownIcon).toBeInTheDocument();
	});

	it("should render UserMenu", () => {
		render(<MemberMenuDropdownTrigger name={""} />);
		const userMenu = screen.getByTestId("user-menu");
		expect(userMenu).toBeInTheDocument();
	});
});
