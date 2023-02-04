import { render, screen } from "@testing-library/react";
import { ConfigService } from "@myacuvue_thailand_web/services";
import LinksSection from ".";
import { ComponentProps } from "react";
import Text from "../../Text";

jest.mock("../../../icons/ChevronRightIcon", () => ({
	__esModule: true,
	IconSize: {
		SMALL: "24px",
		MEDIUM: "48px",
	},
	default: () => <span data-testid="chevron-right-icon" />,
}));

jest.mock("../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

const linkItems: ConfigService.IFooterLinkItem[] = [
	{
		title: "footer.links.about",
		items: [
			{
				name: "footer.links.aboutAcuvue",
				url: "https://www.acuvue.com.au/about",
			},
			{
				name: "footer.links.careers",
				url: "https://www.careers.jnj.com/",
			},
		],
	},
	{
		title: "footer.links.help",
		items: [
			{
				name: "footer.links.contactUs",
				url: "https://www.acuvue.com.au/contact-us",
			},
		],
	},
];

describe("LinksSection", () => {
	it("should render without errors", () => {
		render(<LinksSection data={linkItems} />);
	});

	it("should acuvue-links-section className", () => {
		const { container } = render(<LinksSection data={linkItems} />);

		expect(container.querySelector("div")).toHaveClass(
			"acuvue-links-section"
		);
	});

	it("should render title for each linkGroups", () => {
		render(<LinksSection data={linkItems} />);
		const firstLinkGrouptitle = screen.queryByText(linkItems[0].title);
		expect(firstLinkGrouptitle).toBeInTheDocument();
		const secondLinkGrouptitle = screen.queryByText(linkItems[1].title);
		expect(secondLinkGrouptitle).toBeInTheDocument();
	});

	it("should render three links in total from two linkGroups", async () => {
		render(<LinksSection data={linkItems} />);

		const allGroupLinks = await screen.findAllByRole("link");
		expect(allGroupLinks).toHaveLength(3);
	});

	it("should render three chevron-right-icon in total from two linkGroups", async () => {
		render(<LinksSection data={linkItems} />);

		const chevronRightIcon = await screen.findAllByTestId(
			"chevron-right-icon"
		);
		expect(chevronRightIcon).toHaveLength(3);
	});
});
