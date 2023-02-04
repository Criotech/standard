import { render, screen } from "@testing-library/react";
import LinksAccordion from ".";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import Text from "../../Text";
import { Menu as AntMenu } from "antd";

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
];

jest.mock("../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("antd", () => {
	const Menu = ({ children }: ComponentProps<typeof AntMenu>) => (
		<div data-testid="ant-menu">{children}</div>
	);

	Menu.SubMenu = ({ children }: ComponentProps<typeof AntMenu.SubMenu>) => (
		<div data-testid="ant-sub-menu">{children}</div>
	);

	Menu.Item = ({ children }: ComponentProps<typeof AntMenu.Item>) => (
		<div data-testid="ant-menu-item">{children}</div>
	);

	return {
		Menu,
	};
});

describe("LinksAccordion", () => {
	it("should render without errors", () => {
		render(<LinksAccordion data={linkItems} />);
	});

	it("should render one ant menu", () => {
		render(<LinksAccordion data={linkItems} />);
		const antMenu = screen.getAllByTestId("ant-menu");
		expect(antMenu).toHaveLength(1);
	});

	it("should render one ant sub-menu", () => {
		render(<LinksAccordion data={linkItems} />);
		const antSubMenu = screen.getAllByTestId("ant-sub-menu");
		expect(antSubMenu).toHaveLength(1);
	});

	it("should render two ant-menu-item", () => {
		render(<LinksAccordion data={linkItems} />);
		const antSubMenu = screen.getAllByTestId("ant-menu-item");
		expect(antSubMenu).toHaveLength(2);
	});
});
