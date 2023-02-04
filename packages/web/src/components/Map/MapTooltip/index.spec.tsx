import { render, screen } from "@testing-library/react";
import MapTooltip from ".";
import { ComponentProps, ReactNode } from "react";
import { InfoWindow } from "@react-google-maps/api";

jest.mock("@react-google-maps/api", () => ({
	InfoWindow: ({
		position,
		children,
	}: ComponentProps<typeof InfoWindow> & { children: ReactNode }) => (
		<div data-testid="google-map-info-window">
			{children}
			<span data-testid="info-window-lat">{position?.lat}</span>
			<span data-testid="info-window-lng">{position?.lng}</span>
		</div>
	),
	useJsApiLoader: jest.fn(),
}));

describe("MapTooltip", () => {
	it("should render without errors", () => {
		render(
			<MapTooltip latitude={0} longitude={0} onCloseClick={jest.fn} />
		);
	});

	it("should render marker component", () => {
		render(
			<MapTooltip latitude={100} longitude={0} onCloseClick={jest.fn} />
		);

		const infoWindow = screen.getByTestId("google-map-info-window");

		expect(infoWindow).toBeInTheDocument();
	});

	it("should receive correct latitude", () => {
		render(
			<MapTooltip latitude={100} longitude={0} onCloseClick={jest.fn} />
		);

		const latitude = screen.getByTestId("info-window-lat");

		expect(latitude).toHaveTextContent("100");
	});

	it("should receive correct longitude", () => {
		render(
			<MapTooltip latitude={0} longitude={130} onCloseClick={jest.fn} />
		);

		const longitude = screen.getByTestId("info-window-lng");

		expect(longitude).toHaveTextContent("130");
	});

	it("should render chidren component", () => {
		render(
			<MapTooltip latitude={0} longitude={130} onCloseClick={jest.fn}>
				<span data-testid="fake-child-component">
					fakeChildComponent
				</span>
			</MapTooltip>
		);

		const childComponent = screen.getByTestId("fake-child-component");

		expect(childComponent).toBeInTheDocument();
		expect(childComponent).toHaveTextContent("fakeChildComponent");
	});
});
