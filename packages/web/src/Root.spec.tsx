import { render, screen } from "@testing-library/react";
import Root from "./Root";
import { ReactNode } from "react";

jest.mock("./pages/App", () => ({
	__esModule: true,
	default: () => {
		return <div data-testid="app" />;
	},
}));

const PassThroughFakeComponent = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

jest.mock("./contexts/ConfigurationContext", () => ({
	__esModule: true,
	ConfigurationProvider: PassThroughFakeComponent,
}));

jest.mock("./contexts/StyleProvider", () => ({
	__esModule: true,
	default: PassThroughFakeComponent,
}));

jest.mock("./contexts/LoadingContext", () => ({
	__esModule: true,
	LoadingProvider: PassThroughFakeComponent,
}));

jest.mock("./contexts/LanguageContext", () => ({
	__esModule: true,
	LanguageProvider: PassThroughFakeComponent,
}));

jest.mock("react-router-dom", () => ({
	__esModule: true,
	BrowserRouter: PassThroughFakeComponent,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	__esModule: true,
	CompatRouter: PassThroughFakeComponent,
}));

jest.mock("./components/ScrollToTop", () => ({
	__esModule: true,
	default: PassThroughFakeComponent,
}));

jest.mock("./components/UpdatePrompt", () => ({
	__esModule: true,
	UpdatePrompt: PassThroughFakeComponent,
}));

jest.mock("./Authentication", () => ({
	__esModule: true,
	default: PassThroughFakeComponent,
}));

jest.mock("./components/MaintenanceBanner", () => ({
	__esModule: true,
	default: PassThroughFakeComponent,
}));

describe("Root", () => {
	it("should render the App", () => {
		render(<Root />);
		const app = screen.getByTestId("app");
		expect(app).toBeInTheDocument();
	});
});
