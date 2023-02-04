import StoreList from "./index";
import { screen, waitFor, within } from "@testing-library/react";
import { IStore, ProfileCompleteness } from "@myacuvue_thailand_web/services";
import { useUserProfile } from "../../../../contexts/UserProfileContext";
import { ComponentProps } from "react";
import { Link, useHistory } from "react-router-dom";
import { renderWithLanguage } from "../../../../test-utils";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { act } from "react-dom/test-utils";

const stores: IStore[] = [
	{
		id: "111",
		name: "fakeStoreName1",
		address: "fakeAddress1",
		openingTime: "fakeOpeningTime1",
		closingTime: "fakeClosingTime1",
		phone: "1111111111",
		isEligibleForHomeDelivery: true,
	},
	{
		id: "222",
		name: "fakeStoreName2",
		address: "fakeAddress2",
		openingTime: "fakeOpeningTime2",
		closingTime: "fakeClosingTime2",
		phone: "2222222222",
		isEligibleForHomeDelivery: false,
	},
];

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	Link: ({ children, onClick }: ComponentProps<typeof Link>) => (
		<div data-testid="registartion-link" onClick={onClick as any}>
			{children}
		</div>
	),
	useHistory: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({});

	(useUserProfile as jest.Mock).mockReturnValue({
		profileCompleteness: ProfileCompleteness.COMPLETE,
	});
});

describe("StoreList", () => {
	it("should display store address list with correct content", async () => {
		act(() => {
			renderWithLanguage(<StoreList stores={stores} />);
		});

		await waitFor(() => {
			const store1Name = screen.getByText("fakeStoreName1");
			expect(store1Name).toBeVisible();

			const store1Address = screen.getByText("fakeAddress1");
			expect(store1Address).toBeVisible();

			const store1OperatingHours = screen.getByText(
				"Mon - Sun: fakeOpeningTime1 - fakeClosingTime1"
			);
			expect(store1OperatingHours).toBeVisible();

			const store1Telephone = screen.getByText("1111111111");
			expect(store1Telephone).toBeVisible();

			const store2Name = screen.getByText("fakeStoreName2");
			expect(store2Name).toBeVisible();

			const store2Address = screen.getByText("fakeAddress2");
			expect(store2Address).toBeVisible();

			const store2OperatingHours = screen.getByText(
				"Mon - Sun: fakeOpeningTime2 - fakeClosingTime2"
			);
			expect(store2OperatingHours).toBeVisible();

			const store2Telephone = screen.getByText("2222222222");
			expect(store2Telephone).toBeVisible();
		});
	});

	it("should render RegistrationInviteModal element when clicked on storecell for invalid user", async () => {
		(useUserProfile as jest.Mock).mockReturnValue({
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		act(() => {
			renderWithLanguage(<StoreList stores={stores} />);
		});

		act(() => {
			const link = screen.getAllByRole("link")[0];
			link.click();
		});

		await waitFor(() => {
			const inviteDialog = screen.getByRole("dialog");
			expect(inviteDialog).toBeVisible();

			const dialogTitle = within(inviteDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const dialogMessage = within(inviteDialog).getByText(
				"To register a store, kindly register as MyACUVUE™ member. You will receive a Welcome Coupon upon registration."
			);
			expect(dialogMessage).toBeVisible();
		});
	});

	it("should call history.push with correct parameters when clicked on storecell for valid user", async () => {
		act(() => {
			renderWithLanguage(<StoreList stores={stores} />);
		});

		let historyArgument = {
			pathname: "/store/your-optical-store/register-confirmation",
			state: { store: stores[0] },
		};
		act(() => {
			const link = screen.getAllByRole("link")[0];
			link.click();
		});

		await waitFor(() => {
			expect(useHistory().push).toHaveBeenCalledWith(historyArgument);
		});
	});
});
