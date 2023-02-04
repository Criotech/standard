import { render, screen } from "@testing-library/react";
import PrivilegesBlock from ".";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { ComponentProps } from "react";
import AppPrivilegesCard from "./AppPrivilegesCard";
import Title from "../../../components/Title";
import { ConfigService } from "@myacuvue_thailand_web/services";

jest.mock("../../../hooks/useConfiguration");

jest.mock("../../../components/Title", () => ({
	__esModule: true,
	default: ({ textKey, subKey }: ComponentProps<typeof Title>) => (
		<div>
			<div>{textKey}</div>
			<div>{subKey}</div>
		</div>
	),
}));

jest.mock("./AppPrivilegesCard", () => ({
	__esModule: true,
	default: ({
		iconType,
		titleKey,
		descriptionKey,
	}: ComponentProps<typeof AppPrivilegesCard>) => (
		<div data-testid="app-privilege-card">
			<div>{iconType}</div>
			<div>{titleKey}</div>
			<div>{descriptionKey}</div>
		</div>
	),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		appPrivileges: [],
	});
});

describe("PrivilegesBlock", () => {
	it("should render component without errors", () => {
		render(<PrivilegesBlock />);
	});

	it("should render two app privilege cards", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			appPrivileges: [
				{
					iconType: ConfigService.PrivilegeIconType.LENSES_IN_CIRCLE,
					titleKey: "fakeTitleKey1",
					bodyKey: "fakeBodyKey1",
				},
				{
					iconType: ConfigService.PrivilegeIconType.TICKET_IN_CIRCLE,
					titleKey: "fakeTitleKey2",
					bodyKey: "fakeBodyKey2",
				},
			],
		});

		render(<PrivilegesBlock />);

		const appPrivileges = screen.getAllByTestId("app-privilege-card");
		expect(appPrivileges).toHaveLength(2);
	});
});
