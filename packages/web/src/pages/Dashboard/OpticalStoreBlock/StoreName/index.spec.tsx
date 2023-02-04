import { render, screen } from "@testing-library/react";
import StoreName from ".";

describe("StoreName", () => {
	it("should render without errors", () => {
		render(<StoreName name="Optique Paris Miki (Holland)" />);
	});

	it("should render MyAcuvue optical store name", () => {
		render(<StoreName name="Optique Paris Miki (Holland)" />);
		const name = screen.getByText("Optique Paris Miki (Holland)");
		expect(name).toBeInTheDocument();
	});
});
