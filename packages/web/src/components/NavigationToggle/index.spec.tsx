import NavigationToggle from "./index";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
}));

beforeEach(() => {
	mocked(useLocation).mockReturnValue({
		pathname: "",
		search: "",
		key: "",
		hash: "",
		state: undefined,
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

const renderNavigationToggleWith2DummyTabs = () => {
	return render(
		<NavigationToggle
			navItems={[
				{
					label: "Tab 1",
					path: "/path-1",
				},
				{
					label: "Tab 2",
					path: "/path-2",
				},
			]}
		/>
	);
};

describe("NavigationToggle", () => {
	it("should have both Tab 1 and Tab 2 visible", async () => {
		act(() => {
			renderNavigationToggleWith2DummyTabs();
		});

		await waitFor(() => {
			const tab1 = screen.getByText("Tab 1");
			expect(tab1).toBeVisible();

			const tab2 = screen.getByText("Tab 2");
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
			renderNavigationToggleWith2DummyTabs();
		});

		await waitFor(() => {
			const tab1 = screen.getByText("Tab 1");
			expect(tab1.getAttribute("aria-selected")).toStrictEqual("true");

			const tab2 = screen.getByText("Tab 2");
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
			renderNavigationToggleWith2DummyTabs();
		});

		await waitFor(() => {
			const tab1 = screen.getByText("Tab 1");
			expect(tab1.getAttribute("aria-selected")).toStrictEqual("false");

			const tab2 = screen.getByText("Tab 2");
			expect(tab2.getAttribute("aria-selected")).toStrictEqual("true");
		});
	});

	it("should have first tab selected by default", async () => {
		act(() => {
			renderNavigationToggleWith2DummyTabs();
		});

		await waitFor(() => {
			const tab1 = screen.getByText("Tab 1");
			expect(tab1.getAttribute("aria-selected")).toStrictEqual("true");

			const tab2 = screen.getByText("Tab 2");
			expect(tab2.getAttribute("aria-selected")).toStrictEqual("false");
		});
	});

	it("should navigate to /path-1 when clicked Tab 1", async () => {
		const mockNavigate = jest.fn();
		mocked(useNavigate).mockReturnValue(mockNavigate);

		act(() => {
			renderNavigationToggleWith2DummyTabs();
		});

		await waitFor(() => {
			const tab1 = screen.getByText("Tab 1");
			expect(tab1).toBeVisible();
		});

		act(() => {
			const tab1 = screen.getByText("Tab 1");
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
			renderNavigationToggleWith2DummyTabs();
		});

		await waitFor(() => {
			const tab2 = screen.getByText("Tab 2");
			expect(tab2).toBeVisible();
		});

		act(() => {
			const tab2 = screen.getByText("Tab 2");
			tab2.click();
		});

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/path-2");
		});
	});
});
