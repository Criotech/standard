import { act, fireEvent, waitFor } from "@testing-library/react";
import { render, screen } from "../../test-utils";
import RatingInput from "./index";

it("should render 5 unselected stars when value is not passed", async () => {
	act(() => {
		render(<RatingInput />);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars).toHaveLength(5);

		expect(stars[0]).toBeVisible();
		expect(stars[0]).not.toHaveClass("highlighted");
		expect(stars[0]).not.toHaveClass("disabled");

		expect(stars[1]).toBeVisible();
		expect(stars[1]).not.toHaveClass("highlighted");
		expect(stars[1]).not.toHaveClass("disabled");

		expect(stars[2]).toBeVisible();
		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).not.toHaveClass("disabled");

		expect(stars[3]).toBeVisible();
		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).not.toHaveClass("disabled");

		expect(stars[4]).toBeVisible();
		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).not.toHaveClass("disabled");
	});
});

it("should render 5 unselected stars when value is undefined", async () => {
	act(() => {
		render(<RatingInput value={undefined} />);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars).toHaveLength(5);

		expect(stars[0]).toBeVisible();
		expect(stars[0]).not.toHaveClass("highlighted");
		expect(stars[0]).not.toHaveClass("disabled");

		expect(stars[1]).toBeVisible();
		expect(stars[1]).not.toHaveClass("highlighted");
		expect(stars[1]).not.toHaveClass("disabled");

		expect(stars[2]).toBeVisible();
		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).not.toHaveClass("disabled");

		expect(stars[3]).toBeVisible();
		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).not.toHaveClass("disabled");

		expect(stars[4]).toBeVisible();
		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).not.toHaveClass("disabled");
	});
});

it("should render 2 highlighted stars and 3 unselected stars when value is 2", async () => {
	act(() => {
		render(<RatingInput value={2} />);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars).toHaveLength(5);

		expect(stars[0]).toHaveClass("highlighted");
		expect(stars[0]).not.toHaveClass("disabled");

		expect(stars[1]).toHaveClass("highlighted");
		expect(stars[1]).not.toHaveClass("disabled");

		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).not.toHaveClass("disabled");

		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).not.toHaveClass("disabled");

		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).not.toHaveClass("disabled");
	});
});

it("should render 2 highlighted stars, but change to 4 when 4th star is moused over, then back to 2 when mouse leaves", async () => {
	act(() => {
		render(<RatingInput value={2} />);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars).toHaveLength(5);

		expect(stars[0]).toHaveClass("highlighted");
		expect(stars[0]).not.toHaveClass("disabled");

		expect(stars[1]).toHaveClass("highlighted");
		expect(stars[1]).not.toHaveClass("disabled");

		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).not.toHaveClass("disabled");

		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).not.toHaveClass("disabled");

		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).not.toHaveClass("disabled");
	});

	act(() => {
		const stars = screen.getAllByText("★");
		fireEvent.mouseOver(stars[3]);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars).toHaveLength(5);

		expect(stars[0]).toHaveClass("highlighted");
		expect(stars[0]).not.toHaveClass("disabled");

		expect(stars[1]).toHaveClass("highlighted");
		expect(stars[1]).not.toHaveClass("disabled");

		expect(stars[2]).toHaveClass("highlighted");
		expect(stars[2]).not.toHaveClass("disabled");

		expect(stars[3]).toHaveClass("highlighted");
		expect(stars[3]).not.toHaveClass("disabled");

		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).not.toHaveClass("disabled");
	});

	act(() => {
		const stars = screen.getAllByText("★");
		fireEvent.mouseLeave(stars[3]);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars).toHaveLength(5);

		expect(stars[0]).toHaveClass("highlighted");
		expect(stars[0]).not.toHaveClass("disabled");

		expect(stars[1]).toHaveClass("highlighted");
		expect(stars[1]).not.toHaveClass("disabled");

		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).not.toHaveClass("disabled");

		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).not.toHaveClass("disabled");

		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).not.toHaveClass("disabled");
	});
});

it("should render 5 disabled stars, and keep them disabled even when mousing over a star", async () => {
	act(() => {
		render(<RatingInput isDisabled />);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");

		expect(stars[0]).not.toHaveClass("highlighted");
		expect(stars[0]).toHaveClass("disabled");

		expect(stars[1]).not.toHaveClass("highlighted");
		expect(stars[1]).toHaveClass("disabled");

		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).toHaveClass("disabled");

		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).toHaveClass("disabled");

		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).toHaveClass("disabled");
	});

	act(() => {
		const stars = screen.getAllByText("★");
		fireEvent.mouseOver(stars[3]);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");

		expect(stars[0]).not.toHaveClass("highlighted");
		expect(stars[0]).toHaveClass("disabled");

		expect(stars[1]).not.toHaveClass("highlighted");
		expect(stars[1]).toHaveClass("disabled");

		expect(stars[2]).not.toHaveClass("highlighted");
		expect(stars[2]).toHaveClass("disabled");

		expect(stars[3]).not.toHaveClass("highlighted");
		expect(stars[3]).toHaveClass("disabled");

		expect(stars[4]).not.toHaveClass("highlighted");
		expect(stars[4]).toHaveClass("disabled");
	});
});

it("should call onChange(2) when the 2nd star is clicked", async () => {
	const mockOnChange = jest.fn();
	act(() => {
		render(<RatingInput onChange={mockOnChange} />);
	});

	await waitFor(() => {
		const stars = screen.getAllByText("★");
		expect(stars[1]).toBeVisible();
	});

	act(() => {
		const stars = screen.getAllByText("★");
		stars[1].click();
	});

	await waitFor(() => {
		expect(mockOnChange).toHaveBeenCalledWith(2);
	});
});
