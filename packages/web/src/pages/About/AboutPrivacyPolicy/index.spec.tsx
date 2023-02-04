import AboutPrivacyPolicy from "./index";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useLoading } from "../../../hooks/useLoading";
import { ComponentProps } from "react";
import { useLegalPolicies } from "../../../hooks/useLegalPolicies";
import Header from "../../../components/Layout/Header";
import { useNavigate } from "react-router-dom-v5-compat";
import Text from "../../../components/Text";
import { mocked } from "ts-jest/utils";

jest.mock("../../../hooks/useLegalPolicies", () => ({
	useLegalPolicies: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <>{textKey}</>,
}));

jest.mock("../../../hooks/useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

const fakeHtmlContent: string = "fakeHtml";

beforeEach(() => {
	(useLegalPolicies as jest.Mock).mockReturnValue({
		getPrivacyPolicy: jest.fn().mockReturnValue(fakeHtmlContent),
	});

	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn().mockImplementation(() => {}),
		hideLoading: jest.fn(),
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("AboutPrivacyPolicy", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});
	});

	it("should render a button", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should show and hide loading", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});
		const { showLoading, hideLoading } = useLoading();
		await waitFor(() => expect(showLoading).toHaveBeenCalledTimes(1));
		await waitFor(() => expect(hideLoading).toHaveBeenCalledTimes(1));
	});

	it("should check html content", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});
		const fakeContent = screen.getByText(fakeHtmlContent);
		expect(fakeContent).toBeInTheDocument();
	});

	it("should render masthead", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});
		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("aboutAcuvuePage.privacyPolicy");
	});

	it("should render GlobalNavigationPanel", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});
		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should navigate to /about when clicking back button", async () => {
		await act(async () => {
			render(<AboutPrivacyPolicy />);
		});

		act(() => {
			const backButton = screen.getByRole("button", {
				name: "button.backLabel",
			});
			backButton.click();
		});

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalledWith("/about");
		});
	});
});
