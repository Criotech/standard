import { render, screen } from "@testing-library/react";
import Title from "./index";
import { ComponentProps } from "react";
import Text from "../Text";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("Title", () => {
	it("should render without errors", () => {
		render(
			<Title
				textKey="memberIdPage.registerBlock.registerNowButton"
				subKey="homePage.title"
			/>
		);
	});

	it("should have subKey", () => {
		render(
			<Title
				textKey="memberIdPage.registerBlock.registerNowButton"
				subKey="homePage.title"
			/>
		);

		const subKey = screen.queryByText("homePage.title");
		expect(subKey).toBeInTheDocument();
	});

	it("should have textKey", () => {
		render(
			<Title
				textKey="memberIdPage.registerBlock.registerNowButton"
				subKey="homePage.title"
			/>
		);

		const textKey = screen.queryByText(
			"memberIdPage.registerBlock.registerNowButton"
		);
		expect(textKey).toBeInTheDocument();
	});
});
