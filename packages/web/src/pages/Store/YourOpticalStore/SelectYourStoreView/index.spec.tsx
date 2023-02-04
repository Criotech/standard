import {
	IStoreWithCoordinates,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import SelectYourStoreView from ".";
import { ComponentProps } from "react";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../../test-utils";
import { useUserProfile } from "../../../../contexts/UserProfileContext";
import { MemoryRouter, Route } from "react-router";
import { fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useGeolocation } from "../../../../hooks/useGeolocation";
import userEvent from "@testing-library/user-event";
import Map from "./Map";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../../../hooks/useGeolocation", () => ({
	useGeolocation: jest.fn(),
}));

jest.mock("./Map", () => ({
	__esModule: true,
	default: ({
		markers,
		center,
		onMarkerClick,
	}: ComponentProps<typeof Map>) => (
		<div data-testid="map">
			{markers.map((marker) => (
				<div
					key={marker.latitude}
					onClick={() => onMarkerClick(marker.id)}
					data-testid="marker-latitude"
				>
					{marker.latitude}
				</div>
			))}
			<div data-testid="map-center">{center.latitude}</div>
		</div>
	),
}));

const testStores: IStoreWithCoordinates[] = [
	{
		id: "id1",
		name: "fakeName1",
		address: "fakeAddress1",
		openingTime: "9pm",
		closingTime: "1am",
		phone: "+1111111111",
		isEligibleForHomeDelivery: true,
		district: "district1",
		zone: "zone1",
		latitude: 2.045,
		longitude: -0.104,
	},

	{
		id: "id2",
		name: "fakeName2",
		address: "fakeAddress2",
		openingTime: "9am",
		closingTime: "1pm",
		phone: "+2222222222",
		isEligibleForHomeDelivery: false,
		district: "district2",
		zone: "zone2",
		latitude: 3.045,
		longitude: -4.104,
	},

	{
		id: "id3",
		name: "fakeName3",
		address: "fakeAddress3",
		openingTime: "10am",
		closingTime: "8pm",
		phone: "+333333333",
		isEligibleForHomeDelivery: false,
		district: "district2",
		zone: "zone3",
		latitude: 1.055,
		longitude: -2.304,
	},
];

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});

	(useUserProfile as jest.Mock).mockReturnValue({});

	(useGeolocation as jest.Mock).mockReturnValue({
		userCoordinates: {
			latitude: 15.565793693051953,
			longitude: 101.27812822841425,
		},
	});
});

it("should render correct heading", async () => {
	renderWithLanguage(
		<MemoryRouter>
			<SelectYourStoreView stores={testStores} />
		</MemoryRouter>
	);

	await waitFor(() => {
		const headerText = screen.getByRole("heading", {
			name: "Select Your Optical Store",
		});
		expect(headerText).toBeVisible();
	});
});

it("should list stores based on selecting district and zone", async () => {
	renderWithLanguage(
		<MemoryRouter>
			<SelectYourStoreView stores={testStores} />
		</MemoryRouter>
	);

	const [districtSelect, zoneSelect] = screen.getAllAntSelects();
	await waitFor(() => {
		const storeCells = document.querySelectorAll(".store-cell");

		expect(storeCells).toHaveLength(3);
	});

	act(() => {
		fireEvent.mouseDown(districtSelect);
	});

	act(() => {
		const districtOneOption = screen.getAntSelectOption("district2");
		districtOneOption.click();
	});

	await waitFor(() => {
		const storeCells = document.querySelectorAll(".store-cell");
		expect(zoneSelect).not.toBeDisabled();
		expect(storeCells).toHaveLength(2);
	});

	act(() => {
		fireEvent.mouseDown(zoneSelect);
	});

	await waitFor(() => {
		const zone1Text = screen.queryAllByText("zone1");
		expect(zone1Text.length <= 0).toBeTruthy();

		const zone2Text = screen.getAllByText("zone2");
		expect(zone2Text.length > 0).toBeTruthy();

		const zone3Text = screen.getAllByText("zone3");
		expect(zone3Text.length > 0).toBeTruthy();
	});

	act(() => {
		const zoneOption = screen.getAntSelectOption("zone2");
		zoneOption.click();
	});

	await waitFor(() => {
		const storeCells = document.querySelectorAll(".store-cell");
		expect(storeCells).toHaveLength(1);
	});
});

it("should open error modal when clicked on store when user is not registered", async () => {
	renderWithLanguage(
		<MemoryRouter>
			<SelectYourStoreView stores={testStores} />
		</MemoryRouter>
	);

	act(() => {
		const storeCells = document.querySelectorAll(".store-cell-wrapper");
		userEvent.click(storeCells[0]);
	});

	await waitFor(() => {
		const activeStoreCell = document.querySelector(".ant-modal");
		expect(activeStoreCell).toBeVisible();
	});
});

it("should redirect user to /store/your-optical-store/register-confirmation on clicking store", async () => {
	(useUserProfile as jest.Mock).mockReturnValue({
		profileCompleteness: ProfileCompleteness.COMPLETE,
	});

	renderWithLanguage(
		<MemoryRouter initialEntries={["/"]}>
			<Route exact path="/">
				<SelectYourStoreView stores={testStores} />
			</Route>
			<Route exact path="/store/your-optical-store/register-confirmation">
				Register Confirmation Page
			</Route>
		</MemoryRouter>
	);

	act(() => {
		const storeCells = document.querySelectorAll(".store-cell-wrapper");
		userEvent.click(storeCells[0]);
	});

	await waitFor(() => {
		expect(screen.getByText("Register Confirmation Page")).toBeVisible();
	});
});

it("should highlight store list with correct id on clicking on mark on google map", async () => {
	renderWithLanguage(
		<MemoryRouter>
			<SelectYourStoreView stores={testStores} />
		</MemoryRouter>
	);

	await act(async () => {
		const markers = screen.getAllByTestId("marker-latitude");
		fireEvent.click(markers[0]);
	});

	await waitFor(() => {
		const activeElement = document.querySelector(".active");
		expect(activeElement).toBeVisible();
	});
});
