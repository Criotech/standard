import { render } from "@testing-library/react";
import SmallSearchBar from ".";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../SearchBar/SearchInput", () => ({
	__esModule: true,
	default: ({ onChange }: any) => (
		<input data-testid="search-input" onChange={onChange} />
	),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		searchPrefixUrl: "",
	});
});

describe("SmallSearchBar", () => {
	it("should render without errors", () => {
		render(<SmallSearchBar />);
	});
});
