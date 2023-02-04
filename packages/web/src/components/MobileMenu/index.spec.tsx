import { render, screen } from "@testing-library/react";
import { ConfigService } from "@myacuvue_thailand_web/services";
import MobileMenu from ".";
import Text from "../Text";
import { ComponentProps } from "react";
import { Menu as AntMenu } from "antd";

const topMenuData: ConfigService.ITopHeaderLinks[] = [
	{
		label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
		url: "https://www.acuvue.com.au/questions",
	},
	{
		label: "myacuvueLiteHeader.topHeaderSection.myAcuvueMemberProgram",
		url: "https://www.acuvue.com.au/myacuvue",
	},
];

const menuData: ConfigService.IHeaderMenuItem[] = [
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
];

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("antd", () => {
	const Menu = ({ children }: ComponentProps<typeof AntMenu>) => (
		<div data-testid="ant-menu">{children}</div>
	);

	Menu.Item = ({ children }: ComponentProps<typeof AntMenu.Item>) => (
		<div data-testid="ant-menu-item">{children}</div>
	);

	Menu.SubMenu = ({ children }: ComponentProps<typeof AntMenu.SubMenu>) => (
		<div data-testid="ant-sub-menu">{children}</div>
	);

	return {
		Menu,
	};
});

describe("MobileMenu", () => {
	it("should render without errors", () => {
		render(<MobileMenu topMenus={topMenuData} menus={menuData} />);
	});

	it("should render one ant menu", () => {
		render(<MobileMenu topMenus={topMenuData} menus={menuData} />);
		const antMenu = screen.getAllByTestId("ant-menu");
		expect(antMenu).toHaveLength(1);
	});

	it("should render two ant sub-menu", () => {
		render(<MobileMenu topMenus={topMenuData} menus={menuData} />);
		const antSubMenu = screen.getAllByTestId("ant-sub-menu");
		expect(antSubMenu).toHaveLength(2);
	});

	it("should render five ant-menu-item", () => {
		render(<MobileMenu topMenus={topMenuData} menus={menuData} />);
		const antSubMenu = screen.getAllByTestId("ant-menu-item");
		expect(antSubMenu).toHaveLength(5);
	});
});
