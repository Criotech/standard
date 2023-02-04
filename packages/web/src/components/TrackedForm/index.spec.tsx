import { fireEvent, render, screen } from "@testing-library/react";
import TrackedForm from ".";
import { FormProps } from "antd";
import {
	useFormComplete,
	useFormStart,
	useFormView,
} from "../../hooks/useTracking";
import userEvent from "@testing-library/user-event";

jest.mock("antd", () => ({
	Form: ({ onFinish, children, onChange }: FormProps) => (
		<form
			data-testid="form"
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
		>
			<input
				data-testid="input"
				onChange={(e) => {
					(onChange as any)();
				}}
			/>
		</form>
	),
}));

jest.mock("../../hooks/useTracking");

describe("TrackedForm", () => {
	beforeEach(() => {
		(useFormView as jest.Mock).mockReturnValue(jest.fn());
		(useFormStart as jest.Mock).mockReturnValue(jest.fn());
		(useFormComplete as jest.Mock).mockReturnValue(jest.fn());
	});

	it("should render without errors", () => {
		render(
			<TrackedForm
				onFinish={jest.fn()}
				trackingFormName="register_phone"
			/>
		);
	});

	it("should call useFormView with trackingFormName", () => {
		render(
			<TrackedForm
				onFinish={jest.fn()}
				trackingFormName="register_phone"
			/>
		);

		expect(useFormView).toHaveBeenCalledWith("register_phone");
	});

	it("should call useFormStart with trackingFormName", () => {
		render(
			<TrackedForm
				onFinish={jest.fn()}
				trackingFormName="register_phone"
			/>
		);

		expect(useFormStart).toHaveBeenCalledWith("register_phone");
	});

	it("should render ant form", () => {
		render(
			<TrackedForm
				onFinish={jest.fn()}
				trackingFormName="register_phone"
			/>
		);

		const form = screen.getByTestId("form");

		expect(form).toBeInTheDocument();
	});

	it("should call onFinish when submitted", () => {
		const onFinishMock = jest.fn();

		render(
			<TrackedForm
				onFinish={onFinishMock}
				trackingFormName="register_phone"
			/>
		);

		const form = screen.getByTestId("form");

		fireEvent.submit(form);

		expect(onFinishMock).toHaveBeenCalled();
	});

	it("should call onChange on input changed", () => {
		const onChangeMock = jest.fn();

		render(
			<TrackedForm
				onFinish={jest.fn()}
				onChange={onChangeMock}
				trackingFormName="register_phone"
			/>
		);

		const input = screen.getByTestId("input");
		userEvent.click(input);
		userEvent.keyboard("1");

		expect(onChangeMock).toHaveBeenCalled();
	});
});
