import { act, within, waitFor, fireEvent } from "@testing-library/react";
import OpticalStoreBlock from "./index";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { mocked } from "ts-jest/utils";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useStore } from "../../../hooks/useStore";
import {
	renderWithLanguage,
	screen,
	simulateWideScreen,
} from "../../../test-utils";
import { useFeatureSwitch } from "../../../hooks/useFeatureSwitch";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../hooks/useStore", () => ({
	useStore: jest.fn(),
}));

jest.mock("../../../hooks/useFeatureSwitch", () => ({
	useFeatureSwitch: jest.fn(),
}));

function waitForSelectDropdownToBeInTheDocument(): Promise<void> {
	return waitFor(() => {
		return expect(
			document.querySelector(".ant-select-dropdown")
		).toBeInTheDocument();
	});
}

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		canvasPageUrl: "canvas page url",
		mapDefaultCenter: {
			latitude: 0,
			longitude: 0,
		},
		changeOpticalStoreDialogExtraLines: [],
		opticalStoreAdviceCards: [],
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		resetAuth: jest.fn(),
	});

	mocked(useStore).mockReturnValue({
		registerStore: jest.fn(),
		isEligibleToChangeStore: jest.fn(),
		getStores: jest.fn(),
		getUserStore: jest.fn(),
	});

	(useFeatureSwitch as jest.Mock).mockReturnValue(["ENABLED", true]);
});

describe.each([{ isWideScreen: false }, { isWideScreen: true }])(
	"scenario: %s",
	({ isWideScreen }) => {
		if (isWideScreen) simulateWideScreen();

		it("should display loading skeleton when it is still loading", async () => {
			const { container } = renderWithLanguage(
				<OpticalStoreBlock
					isUserStoreLoading={true}
					userOpticalStore={null}
					refreshUserOpticalStore={jest.fn}
				/>
			);

			await waitFor(() => {
				const skeleton = container.querySelector(".ant-skeleton");
				expect(skeleton).toBeVisible();
			});
		});

		it("should display the user store information when the user already has store", async () => {
			const fakeUserOpticalStore = {
				latitude: 0,
				longitude: 1,
				name: "user store name",
				address: "user store address",
				phone: "user store phone",
				id: "",
				closingTime: "",
				openingTime: "",
				isEligibleForHomeDelivery: false,
			};

			act(() => {
				renderWithLanguage(
					<OpticalStoreBlock
						isUserStoreLoading={false}
						userOpticalStore={fakeUserOpticalStore}
						refreshUserOpticalStore={jest.fn}
					/>
				);
			});

			await waitFor(() => {
				const yourOpticalStoreTitle =
					screen.getByText("Your Optical Store");
				expect(yourOpticalStoreTitle).toBeVisible();

				const userStoreName = screen.getByText("user store name");
				expect(userStoreName).toBeVisible();

				const userStoreAddress = screen.getByText("user store address");
				expect(userStoreAddress).toBeVisible();

				const userStorePhone = screen.getByText("user store phone");
				expect(userStorePhone).toBeVisible();
			});
		});

		it("should allow the user to register the store when the user does not have store yet", async () => {
			const mockRegisterStore = jest.fn();
			mocked(useStore).mockReturnValue({
				registerStore: mockRegisterStore,
				isEligibleToChangeStore: jest.fn(),
				getStores: jest.fn(),
				getUserStore: jest.fn(),
			});

			const { getStores } = useStore();
			mocked(getStores).mockResolvedValue([
				{
					id: "1",
					latitude: 0,
					longitude: 0,
					name: "Store name 1",
					address: "Store address 1",
					phone: "Store telephone 1",
					zone: "Z",
					district: "D",
					openingTime: "",
					closingTime: "",
					isEligibleForHomeDelivery: false,
				},
				{
					id: "2",
					latitude: 0,
					longitude: 0,
					name: "Store name 2",
					address: "Store address 2",
					phone: "Store telephone 2",
					zone: "Z",
					district: "D",
					openingTime: "",
					closingTime: "",
					isEligibleForHomeDelivery: false,
				},
			]);

			act(() => {
				renderWithLanguage(
					<OpticalStoreBlock
						isUserStoreLoading={false}
						userOpticalStore={null}
						refreshUserOpticalStore={jest.fn}
					/>
				);
			});

			await waitFor(() => {
				const registerStoreTitle = screen.getByText(
					"Register Your Preferred Optical Store"
				);
				expect(registerStoreTitle).toBeVisible();

				const storeName1 = screen.getByText("Store name 1");
				expect(storeName1).toBeVisible();

				const storeAddress1 = screen.getByText("Store address 1");
				expect(storeAddress1).toBeVisible();

				const storeTelephone1 = screen.getByText("Store telephone 1");
				expect(storeTelephone1).toBeVisible();

				const storeName2 = screen.getByText("Store name 2");
				expect(storeName2).toBeVisible();

				const storeAddress2 = screen.getByText("Store address 2");
				expect(storeAddress2).toBeVisible();

				const storeTelephone2 = screen.getByText("Store telephone 2");
				expect(storeTelephone2).toBeVisible();

				const numberOfResults = screen.getByText("2 Results");
				expect(numberOfResults).toBeVisible();
			});

			expect(screen.queryByRole("dialog")).toStrictEqual(null);

			const buttons = screen.getAllByRole("button");
			const selectFirstStoreButton = buttons[1];
			const selectSecondStoreButton = buttons[2];
			act(() => {
				selectFirstStoreButton.click();
			});

			await waitFor(() => {
				const confirmationDialog = screen.getByRole("dialog");
				expect(confirmationDialog).toBeVisible();

				const dialogTitle = within(confirmationDialog).getByRole(
					"heading",
					{ name: "You Selected:" }
				);
				expect(dialogTitle).toBeVisible();

				const dialogStoreName =
					within(confirmationDialog).getByText("Store name 1");
				expect(dialogStoreName).toBeVisible();

				const dialogStoreAddress =
					within(confirmationDialog).getByText("Store address 1");
				expect(dialogStoreAddress).toBeVisible();
			});

			act(() => {
				const confirmationDialog = screen.getByRole("dialog");
				within(confirmationDialog)
					.getByRole("button", { name: "CANCEL" })
					.click();
			});

			await waitFor(() => {
				const confirmationDialog = screen.queryByRole("dialog");
				expect(confirmationDialog).toStrictEqual(null);
			});

			act(() => {
				selectSecondStoreButton.click();
			});

			await waitFor(() => {
				const confirmationDialog = screen.getByRole("dialog");
				expect(confirmationDialog).toBeVisible();

				const dialogTitle = within(confirmationDialog).getByRole(
					"heading",
					{ name: "You Selected:" }
				);
				expect(dialogTitle).toBeVisible();

				const dialogStoreName =
					within(confirmationDialog).getByText("Store name 2");
				expect(dialogStoreName).toBeVisible();

				const dialogStoreAddress =
					within(confirmationDialog).getByText("Store address 2");
				expect(dialogStoreAddress).toBeVisible();
			});

			act(() => {
				const confirmationDialog = screen.getByRole("dialog");
				within(confirmationDialog)
					.getByRole("button", { name: "CONFIRM" })
					.click();
			});

			await waitFor(() => {
				expect(mockRegisterStore).toHaveBeenCalledWith({
					storeId: "2",
				});
			});
		});

		it("should allow the user to filter the stores when the user does not have store yet", async () => {
			const mockRegisterStore = jest.fn();
			mocked(useStore).mockReturnValue({
				registerStore: mockRegisterStore,
				isEligibleToChangeStore: jest.fn(),
				getStores: jest.fn(),
				getUserStore: jest.fn(),
			});

			const { getStores } = useStore();
			mocked(getStores).mockResolvedValue([
				{
					id: "1",
					latitude: 0,
					longitude: 0,
					name: "Store name 1",
					address: "Store address 1",
					phone: "Store telephone 1",
					district: "District 1",
					zone: "Zone 1",
					openingTime: "",
					closingTime: "",
					isEligibleForHomeDelivery: false,
				},
				{
					id: "2",
					latitude: 0,
					longitude: 0,
					name: "Store name 2",
					address: "Store address 2",
					phone: "Store telephone 2",
					district: "District 2",
					zone: "Zone 2",
					openingTime: "",
					closingTime: "",
					isEligibleForHomeDelivery: false,
				},
			]);

			renderWithLanguage(
				<OpticalStoreBlock
					isUserStoreLoading={false}
					userOpticalStore={null}
					refreshUserOpticalStore={jest.fn}
				/>
			);

			await waitFor(() => {
				const storeName2 = screen.getByText("Store name 2");
				expect(storeName2).toBeVisible();

				const numberOfResultsBeingTwo = screen.getByText("2 Results");
				expect(numberOfResultsBeingTwo).toBeVisible();
			});

			const selects = screen.getAllAntSelects();
			const stateSelect = selects[0];

			act(() => {
				fireEvent.mouseDown(stateSelect);
			});
			await waitForSelectDropdownToBeInTheDocument();

			await waitFor(() => {
				const findButton = screen.getByRole("button", { name: "FIND" });
				expect(findButton).not.toBeEnabled();
			});

			act(() => {
				const districtOneOption =
					screen.getAntSelectOption("District 1");
				districtOneOption.click();
			});

			await waitFor(() => {
				const findButton = screen.getByRole("button", { name: "FIND" });
				expect(findButton).toBeEnabled();
			});

			act(() => {
				const findButton = screen.getByRole("button", { name: "FIND" });
				findButton.click();
			});

			await waitFor(() => {
				expect(screen.getByText("1 Results")).toBeVisible();

				const storeName2 = screen.queryByText("Store name 2");
				expect(storeName2).not.toBeInTheDocument();
			});
		});
	}
);
