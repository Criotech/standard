import { render, screen } from "@testing-library/react";
import { ConfigService } from "@myacuvue_thailand_web/services";
import MegaMenu from ".";
import ChevronRightIcon from "../../icons/ChevronRightIcon";
import { ComponentProps } from "react";
import Text from "../Text";
import { useConfiguration } from "../../hooks/useConfiguration";

jest.mock("../../icons/ChevronRightIcon", () => ({
	__esModule: true,
	IconSize: {
		SMALL: "24px",
		MEDIUM: "48px",
	},
	default: ({ size }: ComponentProps<typeof ChevronRightIcon>) => (
		<span data-testid="chevron-right-icon" />
	),
}));

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

const demoData: ConfigService.IHeaderMenuItem[] = [
	{
		title: "header.menuTitle.thinkAboutContacts",
		linkGroups: [
			{
				header: "header.menuHeader.whyContacts",
				items: [
					{
						name: "header.menuItem.lifeWithContacts",
						url: "https://www.acuvue.com.au/why-contact-lenses/new-contact-lenses",
					},
					{
						name: "header.menuItem.visionSimulator",
						url: "https://www.acuvue.com.au/why-contact-lenses/vision-simulator",
					},
					{
						name: "header.menuItem.whyAcuvue",
						url: "https://www.acuvue.com.au/why-contact-lenses/why-acuvue",
					},
				],
			},
		],
	},

	{
		title: "header.menuTitle.acuvueProducts",
		linkGroups: [
			{
				header: "header.menuHeader.notSureWhichAcuvueBrand",
				items: [
					{
						name: "header.menuItem.seeAllProducts",
						url: "https://www.acuvue.com.au/contact-lenses/all-contact-lenses",
					},
				],
			},
		],
	},
];

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		topHeaderLinks: [
			{
				label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
				url: "https://www.acuvue.com.au/questions",
			},
		],
	});
});

describe("MegaMenu", () => {
	it("should render without errors", () => {
		render(<MegaMenu menus={demoData} />);
	});

	it("should render title for eack linkGroups", () => {
		render(<MegaMenu menus={demoData} />);
		const firstLinkGrouptitle = screen.queryByText(demoData[0].title);
		expect(firstLinkGrouptitle).toBeInTheDocument();
		const secondLinkGrouptitle = screen.queryByText(demoData[1].title);
		expect(secondLinkGrouptitle).toBeInTheDocument();
	});

	it("should render four links in total from two linkGroups", async () => {
		render(<MegaMenu menus={demoData} />);

		const allGroupLinks = await screen.findAllByRole("link");
		expect(allGroupLinks).toHaveLength(4);
	});

	it("should render four chevron-right-icon in total from two linkGroups", async () => {
		render(<MegaMenu menus={demoData} />);

		const chevronRightIcon = await screen.findAllByTestId(
			"chevron-right-icon"
		);
		expect(chevronRightIcon).toHaveLength(4);
	});

	it("should append only acuvue-mega-menu to className for non-zero topHeaderLinks", async () => {
		const { container } = render(<MegaMenu menus={demoData} />);

		expect(container.firstChild).toHaveClass("acuvue-mega-menu");
		expect(container.firstChild).not.toHaveClass("no-top-header-links");
	});

	it("should append acuvue-mega-menu and no-top-header-links to className for zero topHeaderLinks", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			topHeaderLinks: [],
		});

		const { container } = render(<MegaMenu menus={demoData} />);

		expect(container.firstChild).toHaveClass("acuvue-mega-menu");
		expect(container.firstChild).toHaveClass("no-top-header-links");
	});
});
