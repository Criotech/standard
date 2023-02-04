import { render } from "@testing-library/react";
import ScrollToTop from "./index";
import { useService } from "../../hooks/useService";

jest.mock("../../hooks/useService", () => ({
	useService: jest.fn(),
}));

describe("ScrollToTop", () => {
	it("should call scrollToTop on rendering", () => {
		const mockScrollTo = jest.fn();
		(useService as jest.Mock).mockReturnValue({
			WindowService: {
				scrollTo: mockScrollTo,
			},
		});
		render(<ScrollToTop />);
		expect(mockScrollTo).toHaveBeenCalledTimes(1);
		expect(mockScrollTo).toHaveBeenCalledWith(0, 0, "auto");
	});
});
