import { render, screen } from "@testing-library/react";
import BlockTitle from "./index";
import Text from "../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("BlockTitle", () => {
	it("should render without errors", () => {
		render(
			<BlockTitle textKey="dashboardPage.blockTitle.myAcuvueMembership" />
		);
	});

	it("should render MyAcuvue membership block title", () => {
		render(
			<BlockTitle textKey="dashboardPage.blockTitle.myAcuvueMembership" />
		);
		const blockTitle = screen.queryByText(
			"dashboardPage.blockTitle.myAcuvueMembership"
		);
		expect(blockTitle).toBeInTheDocument();
	});
});
