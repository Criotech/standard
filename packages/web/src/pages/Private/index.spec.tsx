import { ConfigService } from "@myacuvue_thailand_web/services";
import Private from ".";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage } from "../../test-utils";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	Navigate: () => null,
	Route: () => null,
	Routes: () => null,
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});
});

it("should render without errors", async () => {
	renderWithLanguage(<Private />);
});
