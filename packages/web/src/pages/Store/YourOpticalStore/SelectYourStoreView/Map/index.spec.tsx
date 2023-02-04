import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { render, screen } from "@testing-library/react";
import Map, { IMarker } from "./index";
import { useConfiguration } from "../../../../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";

jest.mock("antd", () => ({
	Spin: () => <div data-testid="spinner" />,
}));

jest.mock("@react-google-maps/api", () => ({
	GoogleMap: ({ children }: ComponentProps<typeof GoogleMap>) => (
		<div data-testid="google-map">{children}</div>
	),
	Marker: ({ position }: ComponentProps<typeof Marker>) => (
		<div data-testid="google-map-marker">
			<div data-testid="marker-lat">{position.lat}</div>
			<div data-testid="marker-lng">{position.lng}</div>
		</div>
	),
	useJsApiLoader: jest.fn(),
}));

jest.mock("../../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../../../icons/LocationIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="location-icon" />,
}));

describe("Map", () => {
	beforeEach(() => {
		(useJsApiLoader as jest.Mock).mockReturnValue({
			isLoaded: true,
		});

		(useConfiguration as jest.Mock).mockReturnValue({
			env: ConfigService.ENV.PROD,
			instance: ConfigService.Instance.TH,
			config: {
				baseUrl: "https://localhost",
				liffId: "liff-id",
				googleMapsApiKey: "fake-google-api-key",
			},
		});
	});

	const fakeMarkers: IMarker[] = [
		{
			id: "1",
			latitude: 1.045,
			longitude: -0.104,
		},
		{
			id: "2",
			latitude: 1.145,
			longitude: 20.104,
		},
	];

	it("should render without errors", () => {
		render(
			<Map
				onMarkerClick={() => {}}
				onLocationClick={() => {}}
				markers={fakeMarkers}
				center={fakeMarkers[0]}
			/>
		);
	});

	it("should render Map markers", async () => {
		render(
			<Map
				onMarkerClick={() => {}}
				onLocationClick={() => {}}
				markers={fakeMarkers}
				center={fakeMarkers[0]}
			/>
		);
		const markers = await screen.findAllByTestId("google-map-marker");
		expect(markers.length).toEqual(fakeMarkers.length);
	});

	it("should render Map markers with latitude", async () => {
		render(
			<Map
				onMarkerClick={() => {}}
				onLocationClick={() => {}}
				markers={fakeMarkers}
				center={fakeMarkers[0]}
			/>
		);

		const markerLatitudes = await screen.findAllByTestId("marker-lat");
		expect(markerLatitudes.length).toEqual(fakeMarkers.length);
		expect(markerLatitudes[0]).toHaveTextContent(
			fakeMarkers[0].latitude.toString()
		);
	});

	it("should render Map markers with longitude", async () => {
		render(
			<Map
				onMarkerClick={() => {}}
				onLocationClick={jest.fn()}
				markers={fakeMarkers}
				center={fakeMarkers[0]}
			/>
		);

		const markerLongitudes = await screen.findAllByTestId("marker-lng");
		expect(markerLongitudes.length).toEqual(fakeMarkers.length);
		expect(markerLongitudes[0]).toHaveTextContent(
			fakeMarkers[0].longitude.toString()
		);
	});

	it("should render Map location icon", async () => {
		render(
			<Map
				onMarkerClick={() => {}}
				onLocationClick={jest.fn()}
				markers={fakeMarkers}
				center={fakeMarkers[0]}
			/>
		);

		const locationIcon = await screen.findByTestId("location-icon");
		expect(locationIcon).toBeInTheDocument();
	});
});
