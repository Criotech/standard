import { render } from "@testing-library/react";
import DesktopSearchInput from ".";

jest.mock("../../../../../hooks/useText", () => ({
	useText: jest.fn(),
}));

describe("DesktopSearchInput", () => {
	it("should render without errors", () => {
		render(
			<DesktopSearchInput
				name="search"
				placeholder="myacuvueLiteHeader.searchBar.desktopSearchInput"
				onChange={jest.fn}
				onSubmit={jest.fn()}
				value={""}
			/>
		);
	});
});
