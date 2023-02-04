import { act, waitFor } from "@testing-library/react";
import { renderWithLanguage, screen } from "../../test-utils";
import NavigationTabs from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { mocked } from "ts-jest/utils";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});

	mocked(useLocation).mockReturnValue({
		pathname: "",
		search: "",
		key: "",
		hash: "",
		state: undefined,
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

it("should have both first tab and second tab visible", async () => {
	act(() => {
		renderWithLanguage(
			<NavigationTabs
				navItems={[
					{
						labelKey: "rewardsPage.yourRewardsWallet",
						path: "/path-1",
					},
					{
						labelKey: "rewardsPage.rewardsCatalog",
						path: "/path-2",
					},
				]}
			/>
		);
	});

	await waitFor(() => {
		const tab1 = screen.getByText("My Coupon Wallet");
		expect(tab1).toBeVisible();

		const tab2 = screen.getByText("Reward Catalog");
		expect(tab2).toBeVisible();
	});
});

it("should have first tab selected if location's pathname starts with /path-1", async () => {
	mocked(useLocation).mockReturnValue({
		pathname: "/path-1/something-else",
		search: "",
		key: "",
		hash: "",
		state: undefined,
	});

	act(() => {
		renderWithLanguage(
			<NavigationTabs
				navItems={[
					{
						labelKey: "rewardsPage.yourRewardsWallet",
						path: "/path-1",
					},
					{
						labelKey: "rewardsPage.rewardsCatalog",
						path: "/path-2",
					},
				]}
			/>
		);
	});

	await waitFor(() => {
		const tab1 = screen.getByText("My Coupon Wallet");
		expect(tab1.getAttribute("aria-selected")).toStrictEqual("true");

		const tab2 = screen.getByText("Reward Catalog");
		expect(tab2.getAttribute("aria-selected")).toStrictEqual("false");
	});
});

it("should have second tab selected if location's pathname starts with /path-2", async () => {
	mocked(useLocation).mockReturnValue({
		pathname: "/path-2/something-else",
		search: "",
		key: "",
		hash: "",
		state: undefined,
	});

	act(() => {
		renderWithLanguage(
			<NavigationTabs
				navItems={[
					{
						labelKey: "rewardsPage.yourRewardsWallet",
						path: "/path-1",
					},
					{
						labelKey: "rewardsPage.rewardsCatalog",
						path: "/path-2",
					},
				]}
			/>
		);
	});

	await waitFor(() => {
		const tab1 = screen.getByText("My Coupon Wallet");
		expect(tab1.getAttribute("aria-selected")).toStrictEqual("false");

		const tab2 = screen.getByText("Reward Catalog");
		expect(tab2.getAttribute("aria-selected")).toStrictEqual("true");
	});
});

it("should have first tab selected by default", async () => {
	act(() => {
		renderWithLanguage(
			<NavigationTabs
				navItems={[
					{
						labelKey: "rewardsPage.yourRewardsWallet",
						path: "/path-1",
					},
					{
						labelKey: "rewardsPage.rewardsCatalog",
						path: "/path-2",
					},
				]}
			/>
		);
	});

	await waitFor(() => {
		const tab1 = screen.getByText("My Coupon Wallet");
		expect(tab1.getAttribute("aria-selected")).toStrictEqual("true");

		const tab2 = screen.getByText("Reward Catalog");
		expect(tab2.getAttribute("aria-selected")).toStrictEqual("false");
	});
});

it("should navigate to /path-1 when clicked first tab", async () => {
	const mockNavigate = jest.fn();
	mocked(useNavigate).mockReturnValue(mockNavigate);

	act(() => {
		renderWithLanguage(
			<NavigationTabs
				navItems={[
					{
						labelKey: "rewardsPage.yourRewardsWallet",
						path: "/path-1",
					},
					{
						labelKey: "rewardsPage.rewardsCatalog",
						path: "/path-2",
					},
				]}
			/>
		);
	});

	await waitFor(() => {
		const tab1 = screen.getByText("My Coupon Wallet");
		expect(tab1).toBeVisible();
	});

	act(() => {
		const tab1 = screen.getByText("My Coupon Wallet");
		tab1.click();
	});

	await waitFor(() => {
		expect(mockNavigate).toHaveBeenCalledWith("/path-1");
	});
});

it("should navigate to /path-2 when clicked Tab 2", async () => {
	const mockNavigate = jest.fn();
	mocked(useNavigate).mockReturnValue(mockNavigate);

	act(() => {
		renderWithLanguage(
			<NavigationTabs
				navItems={[
					{
						labelKey: "rewardsPage.yourRewardsWallet",
						path: "/path-1",
					},
					{
						labelKey: "rewardsPage.rewardsCatalog",
						path: "/path-2",
					},
				]}
			/>
		);
	});

	await waitFor(() => {
		const tab2 = screen.getByText("Reward Catalog");
		expect(tab2).toBeVisible();
	});

	act(() => {
		const tab2 = screen.getByText("Reward Catalog");
		tab2.click();
	});

	await waitFor(() => {
		expect(mockNavigate).toHaveBeenCalledWith("/path-2");
	});
});
