import TrackingService from "./index";
import { getConfig } from "../ConfigService";
import { IPageViewEvent } from "./types";

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn(),
}));

describe("TrackingService", () => {
	beforeEach(() => {
		(window as any).dataLayer = undefined;
		document.createElement = jest.fn().mockReturnValue({});
		document.head.appendChild = jest.fn();

		(getConfig as jest.Mock).mockReturnValue({
			tracking: {
				gtmId: "gtmId",
				dataLayerName: "dataLayerName",
			},
		});
	});

	it("should register tracking", () => {
		TrackingService.register();
		expect(document.head.appendChild).toHaveBeenCalledWith({
			innerHTML: expect.stringContaining(",'dataLayerName','gtmId'"),
		});
	});

	it("should send page view event", () => {
		const fakePageData: IPageViewEvent["page_data"] = {
			page_name: "pageName",
			page_referrer: "pageReferrer",
			page_title: "pageTitle",
			page_path: "pagePath",
			page_category: "pageCategory",
			user_login_state: "loginState",
		};
		const fakeUserData: IPageViewEvent["user_data"] = {
			user_id: "fakeUserId",
			user_login_state: "fakeUserLoginState",
		};

		expect(window.dataLayer).toBeUndefined();

		TrackingService.pageView(fakePageData, fakeUserData);

		expect(window.dataLayer).toEqual([
			{ page_data: null, user_data: null },
			{
				event: "page_view",
				page_data: {
					page_name: "pageName",
					page_referrer: "pageReferrer",
					page_title: "pageTitle",
					page_path: "pagePath",
					page_category: "pageCategory",
					user_login_state: "loginState",
				},
				user_data: {
					user_id: "fakeUserId",
					user_login_state: "fakeUserLoginState",
				},
			},
		]);
	});

	it("should send form view event", () => {
		expect(window.dataLayer).toBeUndefined();

		TrackingService.formView("create_profile");
		expect(window.dataLayer).toEqual([
			{ event_data: null },
			{
				event: "form_view",
				event_data: {
					name: "create_profile",
				},
			},
		]);
	});

	it("should send form error event", () => {
		expect(window.dataLayer).toBeUndefined();

		TrackingService.formError("create_profile", "fakeErrorMessage");
		expect(window.dataLayer).toEqual([
			{ event_data: null },
			{
				event: "form_error",
				event_data: {
					name: "create_profile",
					error_message: "fakeErrorMessage",
				},
			},
		]);
	});

	it("should search store event", () => {
		expect(window.dataLayer).toBeUndefined();

		TrackingService.storeSearch({
			state_field: "stateName",
			suburb_field: "suburbName",
			find_field: "findValue",
		});
		expect(window.dataLayer).toEqual([
			{ event_data: null },
			{
				event: "search_store",
				event_data: {
					state_field: "stateName",
					suburb_field: "suburbName",
					find_field: "findValue",
				},
			},
		]);
	});

	it("should send form complete event", () => {
		const fakeUserData: IPageViewEvent["user_data"] = {
			user_id: "fakeUserId",
			user_login_state: "fakeUserLoginState",
		};

		expect(window.dataLayer).toBeUndefined();

		TrackingService.formComplete(
			"update_marketing_preference",
			fakeUserData
		);

		expect(window.dataLayer).toEqual([
			{ event_data: null },
			{
				event: "form_complete",
				event_data: {
					name: "update_marketing_preference",
				},
				user_data: fakeUserData,
			},
		]);
	});

	it("should select store event", () => {
		expect(window.dataLayer).toBeUndefined();

		TrackingService.storeSelect({
			store_name: "stateName",
			store_address: "suburbName",
		});
		expect(window.dataLayer).toEqual([
			{ event_data: null },
			{
				event: "select_store",
				event_data: {
					store_name: "stateName",
					store_address: "suburbName",
				},
			},
		]);
	});
});
