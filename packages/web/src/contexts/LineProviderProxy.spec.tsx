import { useConfiguration } from "../hooks/useConfiguration";
import { useStorage } from "../hooks/useStorage";
import { render, screen } from "@testing-library/react";
import LineProviderProxy from "./LineProviderProxy";

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../hooks/useStorage", () => ({
	useStorage: jest.fn(),
}));

jest.mock("./LineProviderFake", () => ({
	__esModule: true,
	default: () => <div data-testid="line-fake-context"></div>,
}));

jest.mock("./LineContext", () => ({
	__esModule: true,
	LineProvider: () => <div data-testid="line-context"></div>,
}));

describe("LineContextProxy", () => {
	it("should provide correct default line context", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			lineConfig: {
				allowFakeLineProvider: false,
			},
		});

		(useStorage as jest.Mock).mockReturnValue([false]);

		render(<LineProviderProxy />);

		const lineContext = screen.getByTestId("line-context");
		expect(lineContext).toBeInTheDocument();
	});

	it("should provide fake line context", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			lineConfig: {
				allowFakeLineProvider: true,
			},
		});

		(useStorage as jest.Mock).mockReturnValue([true]);

		render(<LineProviderProxy />);

		const lineFakeContext = screen.getByTestId("line-fake-context");
		expect(lineFakeContext).toBeInTheDocument();
	});
});
