import { render } from "@testing-library/react";
import WideSearchForm from ".";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../SearchBar/DesktopSearchInput", () => ({
	__esModule: true,
	default: ({ onChange }: any) => (
		<input data-testid="desktop-search-input" onChange={onChange} />
	),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		searchPrefixUrl: "",
	});
});

describe("WideSearchForm", () => {
	it("should render without errors", () => {
		render(<WideSearchForm />);
	});
});
