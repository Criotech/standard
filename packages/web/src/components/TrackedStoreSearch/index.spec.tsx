import { fireEvent, render, screen } from "@testing-library/react";
import TrackedStoreSearch from ".";
import { FormProps } from "antd";
import { useSearchStore } from "../../hooks/useTracking";
import userEvent from "@testing-library/user-event";

jest.mock("antd", () => ({
	Form: ({ onFinish, children, onChange }: FormProps) => (
		<form
			data-testid="form"
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as Function)();
			}}
		>
			<input
				data-testid="input"
				onChange={(e) => {
					(onChange as Function)();
				}}
			/>
		</form>
	),
}));

jest.mock("../../hooks/useTracking");

describe("TrackedStoreSearch", () => {
	beforeEach(() => {
		(useSearchStore as jest.Mock).mockReturnValue(jest.fn());
	});

	it("should render without errors", () => {
		render(
			<TrackedStoreSearch
				onFinish={jest.fn()}
				stateValue="stateName"
				zoneValue="zoneName"
				findValue="findValue"
			/>
		);
	});

	it("should call useSearchStore with stateValue, zoneValue, findValue", () => {
		render(
			<TrackedStoreSearch
				onFinish={jest.fn()}
				stateValue="stateName"
				zoneValue="zoneName"
				findValue="findValue"
			/>
		);

		expect(useSearchStore).toHaveBeenCalledWith({
			state_field: "stateName",
			suburb_field: "zoneName",
			find_field: "findValue",
		});
	});

	it("should render ant form", () => {
		render(
			<TrackedStoreSearch
				onFinish={jest.fn()}
				stateValue="stateName"
				zoneValue="zoneName"
				findValue="findValue"
			/>
		);

		const form = screen.getByTestId("form");

		expect(form).toBeInTheDocument();
	});

	it("should call onFinish when submitted", () => {
		const onFinishMock = jest.fn();

		render(
			<TrackedStoreSearch
				onFinish={onFinishMock}
				stateValue="stateName"
				zoneValue="zoneName"
				findValue="findValue"
			/>
		);

		const form = screen.getByTestId("form");

		fireEvent.submit(form);

		expect(onFinishMock).toHaveBeenCalled();
	});

	it("should call onChange on input changed", () => {
		const onChangeMock = jest.fn();

		render(
			<TrackedStoreSearch
				onFinish={jest.fn()}
				onChange={onChangeMock}
				stateValue="stateName"
				zoneValue="zoneName"
				findValue="findValue"
			/>
		);

		const input = screen.getByTestId("input");
		userEvent.click(input);
		userEvent.keyboard("1");

		expect(onChangeMock).toHaveBeenCalled();
	});
});
