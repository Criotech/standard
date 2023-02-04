import { render, screen } from "@testing-library/react";
import AcuvueToHome from "../../../images/Acuvue-to-home.png";
import HomeDelivery from ".";

describe("HomeDelivery", () => {
	it("should render without errors", () => {
		render(<HomeDelivery />);
	});

	it("should render imagelink referring to ACUVUEtoHome page", () => {
		render(<HomeDelivery />);
		const HomeDeliveryLink = screen.getByRole("link");
		expect(HomeDeliveryLink).toBeInTheDocument();
		expect(HomeDeliveryLink).toHaveAttribute(
			"href",
			"https://www.acuvue.co.th/ACUVUEtoHome"
		);
	});

	it("should render AcuvueToHome image", () => {
		render(<HomeDelivery />);
		const HomeDeliveryImage = screen.getByAltText("Home delivery");
		expect(HomeDeliveryImage).toBeInTheDocument();
		expect(HomeDeliveryImage).toHaveAttribute("src", AcuvueToHome);
	});
});
