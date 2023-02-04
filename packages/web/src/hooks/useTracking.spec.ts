import { renderHook, act } from "@testing-library/react-hooks";
import { useLocation } from "react-router-dom";
import { useService } from "./useService";
import { useUserProfile } from "../contexts/UserProfileContext";
import { useFormComplete, useFormError, useFormStart } from "./useTracking";
import { useDebounce } from "react-use";

jest.mock("react-router-dom", () => ({ useLocation: jest.fn() }));
jest.mock("./useService", () => ({ useService: jest.fn() }));
jest.mock("../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("react-use", () => ({ useDebounce: jest.fn() }));

describe("useTracking", () => {
	let pageView: Function;
	let formView: Function;
	let formStart: Function;
	let formComplete: Function;
	let formError: Function;
	let storeSelect: Function;
	let storeSearch: Function;

	beforeEach(() => {
		pageView = jest.fn();
		formView = jest.fn();
		formStart = jest.fn();
		storeSelect = jest.fn();
		storeSearch = jest.fn();
		formComplete = jest.fn();
		formError = jest.fn();

		(useDebounce as jest.Mock).mockImplementation((callback) => callback());

		(useLocation as jest.Mock).mockReturnValue({ pathname: "fakePath" });
		(useService as jest.Mock).mockReturnValue({
			TrackingService: {
				pageView,
				formView,
				formStart,
				formComplete,
				formError,
				storeSearch,
				storeSelect,
			},
		});
		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: { myAcuvueId: "myAcuvueId" },
		});
	});

	it("should use Page View", () => {
		const { usePageView } = require("./useTracking");
		renderHook(() => usePageView("pageName", "pageCategory"));
		expect(pageView).toHaveBeenCalledWith(
			{
				page_name: "pageName",
				page_referrer: "",
				page_title: "",
				page_path: "fakePath",
				page_category: "pageCategory",
				user_login_state: "signedIn",
			},
			{
				user_id: "myAcuvueId",
				user_login_state: "signedIn",
			}
		);
	});

	it("should use Form View", () => {
		const { useFormView } = require("./useTracking");

		renderHook(() => useFormView("create_profile"));
		expect(formView).toHaveBeenCalledWith("create_profile");
	});

	it("should use Form Start", () => {
		const { useFormStart } = require("./useTracking");

		const { result } = renderHook(() => useFormStart("create_profile"));

		act(() => {
			result.current();
		});

		expect(formStart).toHaveBeenCalledWith("create_profile");
	});

	it("should use Form Complete", () => {
		const { useFormComplete } = require("./useTracking");

		const { result } = renderHook(() => useFormComplete("create_profile"));

		act(() => {
			result.current();
		});

		expect(formComplete).toHaveBeenCalledWith("create_profile", {
			user_id: "myAcuvueId",
			user_login_state: "signedIn",
		});
	});

	it("should use Form Error", () => {
		const { useFormComplete } = require("./useTracking");

		const { result } = renderHook(() => useFormError("create_profile"));

		act(() => {
			result.current("errorMessage");
		});

		expect(formError).toHaveBeenCalledWith(
			"create_profile",
			"errorMessage"
		);
	});

	it("should use Select Store", () => {
		const { useSelectStore } = require("./useTracking");

		const { result } = renderHook(() => useSelectStore());

		act(() => {
			result.current({
				store_name: "fake-store-name",
				store_address: "fake-store-address",
			});
		});

		expect(storeSelect).toHaveBeenCalledWith({
			store_name: "fake-store-name",
			store_address: "fake-store-address",
		});
	});
	it("should use search store", () => {
		const { useSearchStore } = require("./useTracking");

		const { result } = renderHook(() =>
			useSearchStore({
				state_field: "stateName",
				suburb_field: "suburbName",
				find_field: "findField",
			})
		);

		act(() => {
			result.current();
		});
		expect(storeSearch).toHaveBeenCalledWith({
			state_field: "stateName",
			suburb_field: "suburbName",
			find_field: "findField",
		});
	});
});
