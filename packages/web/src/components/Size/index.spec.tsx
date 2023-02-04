import { render } from "@testing-library/react";
import Size from "./index";
import { useMeasure } from "react-use";

jest.mock("react-use", () => ({
	useMeasure: jest.fn(),
}));

describe("Size", () => {
	it("should not have any class when the width is less than 200", () => {
		(useMeasure as jest.Mock).mockReturnValue([jest.fn(), { width: 199 }]);
		const { container } = render(
			<Size
				classesByWidth={{
					200: "class-1 class-2",
					400: "class-3 class-4",
				}}
			/>
		);
		const divWrapper = container.querySelector("div")!;
		expect(divWrapper).not.toHaveAttribute("class");
	});

	it("should have class-1 and class-2 when the width is between 200 and 400", () => {
		(useMeasure as jest.Mock).mockReturnValue([jest.fn(), { width: 300 }]);
		const { container } = render(
			<Size
				classesByWidth={{
					200: "class-1 class-2",
					400: "class-3 class-4",
				}}
			/>
		);
		const divWrapper = container.querySelector("div")!;
		expect(divWrapper).toHaveClass("class-1", "class-2");
		expect(divWrapper).not.toHaveClass("class-3", "class-4");
	});

	it("should have class-3 and class-4 when the width is bigger than 400", () => {
		(useMeasure as jest.Mock).mockReturnValue([jest.fn(), { width: 401 }]);
		const { container } = render(
			<Size
				classesByWidth={{
					200: "class-1 class-2",
					400: "class-3 class-4",
				}}
			/>
		);
		const divWrapper = container.querySelector("div")!;
		expect(divWrapper).toHaveClass("class-3", "class-4");
		expect(divWrapper).not.toHaveClass("class-1", "class-2");
	});

	it("should render children", () => {
		(useMeasure as jest.Mock).mockReturnValue([jest.fn(), { width: 100 }]);
		const { getByText } = render(
			<Size
				classesByWidth={{
					200: "class-1 class-2",
					400: "class-3 class-4",
				}}
			>
				<div>child text 1</div>
				<div>child text 2</div>
			</Size>
		);

		const child1 = getByText("child text 1");
		expect(child1).toBeInTheDocument();
		const child2 = getByText("child text 2");
		expect(child2).toBeInTheDocument();
	});
});
