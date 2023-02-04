import App from "./App";
import { render } from "@testing-library/react";
import { useConfiguration } from "../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { Layout as AntLayout } from "antd";
import { ComponentProps } from "react";

jest.mock("antd", () => ({
	Layout: ({ children }: ComponentProps<typeof AntLayout>) => <>{children}</>,
}));

jest.mock("./LegacyRoutes", () => ({
	__esModule: true,
	default: () => <div>legacy</div>,
}));

jest.mock("./Routes", () => ({
	__esModule: true,
	default: () => <div>routes</div>,
}));

jest.mock("./RoutesForTokenOnlyFlow", () => ({
	__esModule: true,
	default: () => <div>RoutesForTokenOnlyFlow</div>,
}));

jest.mock("../hooks/useTracking", () => ({
	usePageView: jest.fn(),
}));

jest.mock("../hooks/useConfiguration", () => ({ useConfiguration: jest.fn() }));

describe("App", () => {
	it("should render LegacyRoutes when routesType is LEGACY", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			routesType: ConfigService.RoutesType.LEGACY,
		});
		const { getByText, queryByText } = render(<App />);
		const legacyRoutes = getByText("legacy");
		const routes = queryByText("routes");
		expect(legacyRoutes).toBeInTheDocument();
		expect(routes).not.toBeInTheDocument();
	});

	it("should render Routes when routesType is XIAM_FLOW", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			routesType: ConfigService.RoutesType.XIAM_FLOW,
		});
		const { getByText } = render(<App />);
		const routes = getByText("routes");
		expect(routes).toBeInTheDocument();
	});

	it("should render RoutesForTokenOnlyFlow when routesType is TOKEN_ONLY_FLOW", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			routesType: ConfigService.RoutesType.TOKEN_ONLY_FLOW,
		});
		const { getByText } = render(<App />);
		const routes = getByText("RoutesForTokenOnlyFlow");
		expect(routes).toBeInTheDocument();
	});
});
