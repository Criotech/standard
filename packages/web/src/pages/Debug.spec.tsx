import { render } from "@testing-library/react";
import Debug from "./Debug";
import { useAuthentication } from "../hooks/useAuthentication";
import { useRegistration } from "../hooks/useRegistration";

jest.mock("../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

describe("Debug", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			resetAuth: jest.fn(),
			processSessionToken: jest.fn(),
			status: "",
		});

		(useRegistration as jest.Mock).mockReturnValue({
			validateOtp: jest.fn(),
			register: jest.fn(),
		});
	});

	it("should render without errors", () => {
		render(<Debug />);
	});
});
