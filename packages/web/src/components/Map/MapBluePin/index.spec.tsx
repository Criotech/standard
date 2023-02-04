import { render, screen } from "@testing-library/react";
import MapBluePin from ".";
import { Marker } from "@react-google-maps/api";
import { ComponentProps } from "react";

jest.mock("@react-google-maps/api", () => ({
	Marker: ({ position, label }: ComponentProps<typeof Marker>) => (
		<div data-testid="google-map-marker">
			<span data-testid="marker-lat">{position.lat}</span>
			<span data-testid="marker-lng">{position.lng}</span>
			<span data-testid="marker-label">{JSON.stringify(label)}</span>
		</div>
	),
	useJsApiLoader: jest.fn(),
}));

describe("MapBluePin", () => {
	it("should render without errors", () => {
		render(<MapBluePin latitude={0} longitude={0} />);
	});

	it("should render marker component", () => {
		render(<MapBluePin latitude={100} longitude={0} />);

		const marker = screen.getByTestId("google-map-marker");

		expect(marker).toBeInTheDocument();
	});

	it("should receive correct latitude", () => {
		render(<MapBluePin latitude={100} longitude={0} />);

		const latitude = screen.getByTestId("marker-lat");

		expect(latitude).toHaveTextContent("100");
	});

	it("should receive correct longitude", () => {
		render(<MapBluePin latitude={0} longitude={130} />);

		const longitude = screen.getByTestId("marker-lng");

		expect(longitude).toHaveTextContent("130");
	});

	it("should receive correct label when passed", () => {
		render(
			<MapBluePin latitude={0} longitude={0} labelText="fakeLabelText" />
		);

		const label = screen.getByTestId("marker-label");

		expect(label).toHaveTextContent("fakeLabelText");
	});
});
