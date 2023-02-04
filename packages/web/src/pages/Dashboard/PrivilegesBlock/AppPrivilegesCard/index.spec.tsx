import AppPrivilegesCard from "./index";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import { ConfigService } from "@myacuvue_thailand_web/services";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../icons/TicketInCircleIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="fake-ticket-icon"></div>,
}));

describe("AppPrivilegesCard", () => {
	it("should render without errors", () => {
		render(
			<AppPrivilegesCard
				iconType={ConfigService.PrivilegeIconType.LENSES_IN_CIRCLE}
				titleKey={"phoneRegistrationPage.welcome"}
				descriptionKey={"phoneRegistrationPage.fillYourNumber"}
			/>
		);
	});

	it("should render correct title", () => {
		render(
			<AppPrivilegesCard
				iconType={ConfigService.PrivilegeIconType.LENSES_IN_CIRCLE}
				titleKey={"phoneRegistrationPage.welcome"}
				descriptionKey={"phoneRegistrationPage.fillYourNumber"}
			/>
		);

		const titleKey = screen.queryByText("phoneRegistrationPage.welcome");
		expect(titleKey).toBeInTheDocument();
	});

	it("should render correct description", () => {
		render(
			<AppPrivilegesCard
				iconType={ConfigService.PrivilegeIconType.LENSES_IN_CIRCLE}
				titleKey={"phoneRegistrationPage.welcome"}
				descriptionKey={"phoneRegistrationPage.fillYourNumber"}
			/>
		);

		const descriptionKey = screen.queryByText(
			"phoneRegistrationPage.fillYourNumber"
		);
		expect(descriptionKey).toBeInTheDocument();
	});

	it("should render TicketInCircleIcon when iconType is TICKET_IN_CIRCLE", () => {
		render(
			<AppPrivilegesCard
				iconType={ConfigService.PrivilegeIconType.TICKET_IN_CIRCLE}
				titleKey={"phoneRegistrationPage.welcome"}
				descriptionKey={"phoneRegistrationPage.welcome"}
			/>
		);

		const appPrivilegeIcon = screen.getByTestId("fake-ticket-icon");
		expect(appPrivilegeIcon).toBeInTheDocument();
	});
});
