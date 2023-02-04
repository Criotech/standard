import SmallView from "./index";
import { render } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("SmallView", () => {
	it("should render without errors", () => {
		render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);
	});

	it("should have mmall-view class name", () => {
		const { container } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		expect(container.querySelector(".small-view")).toBeInTheDocument();
	});

	it("should render invitationTitle key", () => {
		const { queryByText } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		const invitationTitleKey = queryByText(
			"dashboardPage.invitation.title"
		);
		expect(invitationTitleKey).toBeInTheDocument();
	});

	it("should render invitationBody key", () => {
		const { queryByText } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		const invitationBody = queryByText("dashboardPage.invitation.body");
		expect(invitationBody).toBeInTheDocument();
	});

	it("should render three images", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		const images = getAllByRole("img");
		expect(images).toHaveLength(3);
	});

	it("should render cropped girls-looking-at-smartphone image", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		const images = getAllByRole("img");
		expect(images[0]).toHaveAttribute(
			"src",
			expect.stringContaining("cropped-girls-looking-at-smartphone.png")
		);
	});

	it("should render cropped AppStoreLogo image", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		const images = getAllByRole("img");
		expect(images[1]).toHaveAttribute("src", "AppStoreLogo.svg");
	});

	it("should render cropped google-play-logo image", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink=""
			/>
		);

		const images = getAllByRole("img");
		expect(images[2]).toHaveAttribute("src", "google-play-logo.svg");
	});

	it("should render two links", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink="fake-link"
			/>
		);

		const links = getAllByRole("link");
		expect(links).toHaveLength(2);
	});

	it("should render appstore download link", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink="fake-appstore-download-link"
				googlePlayStoreLink=""
			/>
		);

		const appStoreLink = getAllByRole("link")[0];
		expect(appStoreLink).toHaveAttribute(
			"href",
			"fake-appstore-download-link"
		);
	});

	it("should render google play download link", () => {
		const { getAllByRole } = render(
			<SmallView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				appleAppStoreLink=""
				googlePlayStoreLink="fake-googleplay-download-link"
			/>
		);

		const googlePlayLink = getAllByRole("link")[1];
		expect(googlePlayLink).toHaveAttribute(
			"href",
			"fake-googleplay-download-link"
		);
	});
});
