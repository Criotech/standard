import { render } from "@testing-library/react";
import ProfileMenu from "./index";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import { Link } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	Link: ({ children }: ComponentProps<typeof Link>) => <a>{children}</a>,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("ProfileMenu", () => {
	it("should render without errors", () => {
		render(<ProfileMenu />);
	});
});
