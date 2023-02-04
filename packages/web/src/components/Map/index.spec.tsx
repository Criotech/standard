import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { render, screen } from "@testing-library/react";
import Map from ".";
import { useConfiguration } from "../../hooks/useConfiguration";
import { ComponentProps } from "react";

jest.mock("@react-google-maps/api", () => ({
	GoogleMap: ({
		children,
		zoom,
		center,
		mapContainerStyle,
	}: ComponentProps<typeof GoogleMap>) => (
		<div data-testid="google-map">
			{children}
			<span data-testid="google-map-zoom">{zoom}</span>
			<span data-testid="google-map-center">
				{JSON.stringify(center)}
			</span>
			<span data-testid="google-map-container-style">
				{JSON.stringify(mapContainerStyle)}
			</span>
		</div>
	),
	useJsApiLoader: jest.fn(),
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

describe("Map", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			config: {
				googleMapsApiKey: "fakeGoogleApiKey",
			},
		});
		(useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: true });
	});

	it("should render without errors", () => {
		render(<Map />);
	});

	it("should receive correct zoom prop", () => {
		render(<Map zoom={6} />);

		const zoom = screen.getByTestId("google-map-zoom");

		expect(zoom).toBeInTheDocument();
		expect(zoom).toHaveTextContent("6");
	});

	it("should receive correct center prop", () => {
		render(<Map center={{ latitude: 100, longitude: 30 }} />);

		const center = screen.getByTestId("google-map-center");

		expect(center).toBeInTheDocument();
		expect(center).toHaveTextContent(JSON.stringify({ lat: 100, lng: 30 }));
	});

	it("should receive correct height and width props", () => {
		render(<Map height="100px" width="100px" />);

		const mapContainerStyle = screen.getByTestId(
			"google-map-container-style"
		);

		expect(mapContainerStyle).toBeInTheDocument();
		expect(mapContainerStyle).toHaveTextContent(
			JSON.stringify({ width: "100px", height: "100px" })
		);
	});

	it("should have default height and width to be 500px when not passed", () => {
		render(<Map />);

		const mapContainerStyle = screen.getByTestId(
			"google-map-container-style"
		);

		expect(mapContainerStyle).toBeInTheDocument();
		expect(mapContainerStyle).toHaveTextContent(
			JSON.stringify({ width: "500px", height: "500px" })
		);
	});

	it("should render loading block when isLoaded is false", () => {
		(useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: false });

		render(<Map />);

		const loadingBlock = screen.getByTestId("loading-block");

		expect(loadingBlock).toBeInTheDocument();
	});
});
