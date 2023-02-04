import { ConfigService } from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage } from "../../test-utils";
import Banner from "./Banner";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../hooks/useText", () => ({ useText: jest.fn() }));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.TH,
	});
});

describe("Banner", () => {
	it("should render without errors", () => {
		renderWithLanguage(<Banner />);
	});
});
