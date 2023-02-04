import TopHeader from ".";
import { render, screen } from "@testing-library/react";
import Text from "../../../Text";
import { ComponentProps } from "react";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		topHeaderLinks: [
			{
				label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
				url: "https://www.acuvue.com.au/questions",
			},
			{
				label: "myacuvueLiteHeader.topHeaderSection.myAcuvueMemberProgram",
				url: "https://www.acuvue.com.au/myacuvue",
			},
		],
	});
});

it("should render without errors", () => {
	render(<TopHeader />);
});

it("should render two anchor tags with appropriate link, questions and myacuvue", () => {
	render(<TopHeader />);
	const links = screen.getAllByRole("link");
	expect(links).toHaveLength(2);
	expect(links[0]).toHaveAttribute(
		"href",
		"https://www.acuvue.com.au/questions"
	);
	expect(links[1]).toHaveAttribute(
		"href",
		"https://www.acuvue.com.au/myacuvue"
	);
});
