import { render, screen } from "@testing-library/react";
import AcuvueLogo from ".";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

describe("AcuvueLogo", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			canvasHomePageUrl: "fakeUrl",
		});
	});

	it("should render without errors", () => {
		render(<AcuvueLogo data-testid="acuvueLogo" />);
	});

	it("should render acuvue brand icon component", () => {
		render(<AcuvueLogo />);
		const acuvueBrandIcon = screen.getByRole("img");
		expect(acuvueBrandIcon).toBeInTheDocument();
		expect(acuvueBrandIcon).toHaveAttribute("src", "acuvue-brand-icon.svg");
	});

	it("should render an anchor tag with appropriate link", () => {
		render(<AcuvueLogo />);
		const acuvueLogo = screen.getByRole("link");
		expect(acuvueLogo).toBeInTheDocument();
		expect(acuvueLogo).toHaveAttribute("href", "fakeUrl");
		expect(acuvueLogo).toHaveClass("acuvue-logo");
	});
});
