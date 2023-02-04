import { render, waitFor } from "@testing-library/react";
import SignIn from "./index";
import { useXiam } from "../../contexts/XiamContext";
import { useSession } from "../../hooks/useSession";
import { useCallbackWithLoading } from "../../hooks/useCallbackWithLoading";

jest.mock("../../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../../hooks/useSession", () => ({
	useSession: jest.fn(),
}));

jest.mock("../../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

beforeEach(() => {
	(useCallbackWithLoading as jest.Mock).mockImplementation(
		(callback) => callback
	);

	(useXiam as jest.Mock).mockReturnValue({
		loginRedirect: jest.fn(),
		getXiamToken: jest
			.fn()
			.mockResolvedValue({ rawValue: "fakeXiamToken" }),
	});

	(useSession as jest.Mock).mockReturnValue({
		startSession: jest.fn(),
	});
});

describe("SignIn", () => {
	it("render without errors", () => {
		render(<SignIn />);
	});

	it("should open login popup if there is no xiam token", async () => {
		(useXiam as jest.Mock).mockReturnValue({
			loginRedirect: jest.fn(),
			getXiamToken: jest.fn().mockResolvedValue(undefined),
		});

		render(<SignIn />);

		await waitFor(() => {
			expect(useXiam().loginRedirect).toHaveBeenCalled();
		});
	});

	it("should call startSession if xiam token is defined", async () => {
		(useXiam as jest.Mock).mockReturnValue({
			loginRedirect: jest.fn(),
			getXiamToken: jest
				.fn()
				.mockResolvedValue({ rawValue: "fakeXiamToken" }),
		});

		(useSession as jest.Mock).mockReturnValue({
			startSession: jest.fn(),
		});

		render(<SignIn />);

		await waitFor(() => {
			expect(useSession().startSession).toHaveBeenCalled();
		});
	});
});
