import { render } from "@testing-library/react";
import Tab from "./index";

jest.mock("../../hooks/useText", () => ({ useText: jest.fn() }));

describe("Tab", () => {
	it("should render without errors", () => {
		render(
			<Tab
				value={"value"}
				items={[
					{
						labelKey: "notProvided",
						value: "value",
						disabled: false,
					},
				]}
			/>
		);
	});
});
