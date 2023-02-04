import { render, screen } from "@testing-library/react";
import InvitationBlock from ".";
import { useWideScreen } from "../../../hooks/useWideScreen";
import Text from "../../../components/Text";
import { ComponentProps } from "react";
import SmallView from "./SmallView";
import WideView from "./WideView";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("./SmallView", () => ({
	__esModule: true,
	default: ({
		invitationTitleKey,
		invitationBody,
		appleAppStoreLink,
		googlePlayStoreLink,
	}: ComponentProps<typeof SmallView>) => (
		<span data-testid="invitation-block-small-view">
			<span>{invitationTitleKey}</span>
			<span>{invitationBody}</span>
			<span>{appleAppStoreLink}</span>
			<span>{googlePlayStoreLink}</span>
		</span>
	),
}));

jest.mock("./WideView", () => ({
	__esModule: true,
	default: ({
		invitationTitleKey,
		invitationBody,
		qrCodeImagePath,
		qrCodeSubtitleKey,
	}: ComponentProps<typeof WideView>) => (
		<span data-testid="invitation-block-wide-view">
			<span>{invitationTitleKey}</span>
			<span>{invitationBody}</span>
			<span>{qrCodeImagePath}</span>
			<span>{qrCodeSubtitleKey}</span>
		</span>
	),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: true,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		googlePlayStoreLink: "",
		appleAppStoreLink: "",
		instance: ConfigService.Instance.AU,
	});
});

describe("InvitationBlock", () => {
	it("should render component without errors", () => {
		render(<InvitationBlock />);
	});

	it("should render invitation title", () => {
		render(<InvitationBlock />);

		const invitationTitle = screen.getByText(
			"dashboardPage.invitation.title"
		);

		expect(invitationTitle).toBeInTheDocument();
	});

	it("should render invitation body", () => {
		render(<InvitationBlock />);

		const invitationBody = screen.getByText(
			"dashboardPage.invitation.body"
		);

		expect(invitationBody).toBeInTheDocument();
	});

	it("should render qrSubtitle", () => {
		render(<InvitationBlock />);

		const qrCodeSubtitleKey = screen.getByText(
			"dashboardPage.invitation.qrCodeSubtitle"
		);

		expect(qrCodeSubtitleKey).toBeInTheDocument();
	});

	it("should render small view when in small screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(<InvitationBlock />);

		const invitationBlockSmallView = screen.getByTestId(
			"invitation-block-small-view"
		);

		expect(invitationBlockSmallView).toBeInTheDocument();
	});

	it("should render wide view when in wide screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		render(<InvitationBlock />);

		const invitationBlockWideView = screen.getByTestId(
			"invitation-block-wide-view"
		);

		expect(invitationBlockWideView).toBeInTheDocument();
	});
});
