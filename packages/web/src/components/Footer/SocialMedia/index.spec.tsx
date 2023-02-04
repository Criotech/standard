import { ConfigService } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import SocialMedia from ".";

const fakeSocialNetworks = [
	{
		icon: ConfigService.SocialNetworkIcons.FACEBOOK,
		link: "https://jnj.com/1",
	},
	{
		icon: ConfigService.SocialNetworkIcons.INSTAGRAM,
		link: "https://jnj.com/2",
	},
	{
		icon: ConfigService.SocialNetworkIcons.YOUTUBE,
		link: "https://jnj.com/3",
	},
	{
		icon: ConfigService.SocialNetworkIcons.LINE,
		link: "https://jnj.com/4",
	},
];

jest.mock("../../../icons/FacebookIcon", () => ({
	IconSize: {
		LARGE: "acuvue-btn-medium",
	},
	__esModule: true,
	default: () => <div>facebook-icon</div>,
}));

jest.mock("../../../icons/YoutubeIcon", () => ({
	IconSize: {
		LARGE: "acuvue-btn-medium",
	},
	__esModule: true,
	default: () => <div>youtube-icon</div>,
}));

jest.mock("../../../icons/InstagramIcon", () => ({
	IconSize: {
		SMALL: "acuvue-btn-medium",
	},
	__esModule: true,
	default: () => <div>instagram-icon</div>,
}));

jest.mock("../../../icons/LineIcon", () => ({
	IconSize: {
		LARGE: "acuvue-btn-medium",
	},
	__esModule: true,
	default: () => <div>line-icon</div>,
}));

describe("SocialMedia", () => {
	it("should render without errors", () => {
		render(<SocialMedia socialNetworks={fakeSocialNetworks} />);
	});

	it("should render 3 social media links", () => {
		render(<SocialMedia socialNetworks={fakeSocialNetworks} />);

		const socialNetworkLinks = screen.getAllByRole("link");
		expect(socialNetworkLinks).toHaveLength(4);
	});

	it("should render social media facebook-icon with it's link", () => {
		render(<SocialMedia socialNetworks={fakeSocialNetworks} />);

		const socialNetworkOne = screen.getAllByRole("link")[0];

		expect(socialNetworkOne).toHaveTextContent("facebook-icon");
		expect(socialNetworkOne).toHaveAttribute("href", "https://jnj.com/1");
	});

	it("should render social media instagram-icon with it's link", () => {
		render(<SocialMedia socialNetworks={fakeSocialNetworks} />);

		const socialNetworkTwo = screen.getAllByRole("link")[1];

		expect(socialNetworkTwo).toHaveTextContent("instagram-icon");
		expect(socialNetworkTwo).toHaveAttribute("href", "https://jnj.com/2");
	});

	it("should render social media youtube-icon with it's link", () => {
		render(<SocialMedia socialNetworks={fakeSocialNetworks} />);

		const socialNetworkTwo = screen.getAllByRole("link")[2];

		expect(socialNetworkTwo).toHaveTextContent("youtube-icon");
		expect(socialNetworkTwo).toHaveAttribute("href", "https://jnj.com/3");
	});

	it("should render social media line-icon with it's link", () => {
		render(<SocialMedia socialNetworks={fakeSocialNetworks} />);

		const socialNetworkTwo = screen.getAllByRole("link")[3];

		expect(socialNetworkTwo).toHaveTextContent("line-icon");
		expect(socialNetworkTwo).toHaveAttribute("href", "https://jnj.com/4");
	});
});
