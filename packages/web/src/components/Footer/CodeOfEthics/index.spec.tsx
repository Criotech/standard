import { act, screen, waitFor } from "@testing-library/react";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage } from "../../../test-utils";
import CodeOfEthics from "./";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

describe("CodeOfEthics", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			instance: "scdf",
		});
	});

	it("should render without errors", () => {
		act(() => {
			renderWithLanguage(<CodeOfEthics />);
		});
	});

	it("should render logo", async () => {
		act(() => {
			renderWithLanguage(<CodeOfEthics />);
		});

		await waitFor(() => {
			const image = screen.getByRole("img");
			expect(image).toBeInTheDocument();
			expect(image).toHaveAttribute(
				"src",
				"code-of-ethics-logo-advamed.png"
			);
		});
	});

	it("should render logo link", async () => {
		act(() => {
			renderWithLanguage(<CodeOfEthics />);
		});

		await waitFor(() => {
			const logoLink = screen.getAllByRole("link")[0];
			expect(logoLink).toBeInTheDocument();
			expect(logoLink).toHaveAttribute("href", "https://www.advamed.org");
		});
	});

	it("should render description text", async () => {
		act(() => {
			renderWithLanguage(<CodeOfEthics />);
		});

		await waitFor(() => {
			const descriptionText = screen.queryByText(
				"We support the AdvaMed Code of Ethics on interacting with Healthcare Professionals."
			);
			expect(descriptionText).toBeInTheDocument();
		});
	});

	it("should render eye care professionals button", async () => {
		act(() => {
			renderWithLanguage(<CodeOfEthics />);
		});

		await waitFor(() => {
			const eyeCareProfessionalsButton = screen.getByRole("button");
			expect(eyeCareProfessionalsButton).toBeInTheDocument();
			expect(eyeCareProfessionalsButton).toHaveTextContent(
				"EYE CARE PROFESSIONALS"
			);
		});
	});
});
