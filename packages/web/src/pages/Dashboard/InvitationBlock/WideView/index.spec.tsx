import { render, screen } from "@testing-library/react";
import InvitationBlockWideView from ".";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("InvitationBlockWideScreen", () => {
	it("should render without erros", () => {
		render(
			<InvitationBlockWideView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				qrCodeSubtitleKey="dashboardPage.invitation.qrCodeSubtitle"
				qrCodeImagePath=""
			/>
		);
	});

	it("should render appropriate text contents", () => {
		render(
			<InvitationBlockWideView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				qrCodeSubtitleKey="dashboardPage.invitation.qrCodeSubtitle"
				qrCodeImagePath=""
			/>
		);

		const title = screen.getByText("dashboardPage.invitation.title");
		const body = screen.getByText("dashboardPage.invitation.body");
		const qrSubtitle = screen.getByText(
			"dashboardPage.invitation.qrCodeSubtitle"
		);

		expect(title).toBeInTheDocument();
		expect(body).toBeInTheDocument();
		expect(qrSubtitle).toBeInTheDocument();
	});

	it("should render image contents", () => {
		render(
			<InvitationBlockWideView
				invitationTitleKey="dashboardPage.invitation.title"
				invitationBody="dashboardPage.invitation.body"
				qrCodeSubtitleKey="dashboardPage.invitation.qrCodeSubtitle"
				qrCodeImagePath=""
			/>
		);

		const girlsImage = screen.getAllByRole("img")[0];

		expect(girlsImage).toHaveAttribute(
			"src",
			expect.stringContaining("cropped-girls-looking-at-smartphone.png")
		);
	});
});
