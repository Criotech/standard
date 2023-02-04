import { render, screen, fireEvent } from "@testing-library/react";
import FilterStoreForm from ".";
import { ComponentProps } from "react";
import Text from "../../../../../components/Text";
import { Select as AntSelect } from "antd";
import Select from "../../../../../components/Select";
import TrackedStoreSearch from "../../../../../components/TrackedStoreSearch";

jest.mock("../../../../../components/TrackedStoreSearch", () => ({
	__esModule: true,
	default: ({
		children,
		onFinish,
	}: ComponentProps<typeof TrackedStoreSearch>) => (
		<form
			data-testid="filter-store-form"
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
		>
			{children}
		</form>
	),
}));

jest.mock("antd", () => ({
	Select: {
		Option: ({ value }: ComponentProps<typeof AntSelect>) => (
			<option data-testid="form-select-option">{value}</option>
		),
	},
}));

jest.mock("../../../../../components/Select", () => ({
	__esModule: true,
	default: ({ children, onChange }: ComponentProps<typeof Select>) => (
		<select data-testid="form-select" onChange={onChange as any}>
			{children}
		</select>
	),
}));

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../FindInput", () => ({
	__esModule: true,
	default: () => <input data-testid="find-input" />,
}));

describe("FilterStoreForm", () => {
	it("should render without errors", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);
	});

	it("should render antd form", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const filterForm = screen.getByTestId("filter-store-form");

		expect(filterForm).toBeInTheDocument();
	});

	it("should render two form select inputs", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const formSelectInputs = screen.getAllByTestId("form-select");

		expect(formSelectInputs).toHaveLength(2);
	});

	it("should call onStateChange when state selection is changed", () => {
		const onStateChangeMock = jest.fn();

		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={onStateChangeMock}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const formSelectInputs = screen.getAllByTestId("form-select");

		fireEvent.change(formSelectInputs[0], { target: { value: "abc123" } });

		expect(onStateChangeMock).toHaveBeenCalled();
	});

	it("should call onZoneChange when state selection is changed", () => {
		const onZoneChangeMock = jest.fn();

		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={onZoneChangeMock}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const formSelectInputs = screen.getAllByTestId("form-select");

		fireEvent.change(formSelectInputs[1], { target: { value: "abc123" } });

		expect(onZoneChangeMock).toHaveBeenCalled();
	});

	it("should render find input", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const findInput = screen.getByTestId("find-input");

		expect(findInput).toBeInTheDocument();
	});

	it("should render three stateOptions and two default option", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={["option1", "option2", "option3"]}
				onZoneChange={jest.fn()}
				zoneOptions={[]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const selectOptions = screen.getAllByTestId("form-select-option");

		expect(selectOptions).toHaveLength(5);
	});

	it("should render three zoneOptions and two default option", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={["option1", "option2", "option3"]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const selectOptions = screen.getAllByTestId("form-select-option");

		expect(selectOptions).toHaveLength(5);
	});

	it("should render submit button", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={["option1", "option2", "option3"]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={false}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const submitButton = screen.getByText(
			"dashboardPage.opticalStore.filterForm.find"
		);
		expect(submitButton).toBeInTheDocument();
	});

	it("should disable submit button when isFindEnabled is true", () => {
		render(
			<FilterStoreForm
				zoneDefaultOptionKey="notProvided"
				stateDefaultOptionKey="notProvided"
				findPlaceholderKey="notProvided"
				findLabelKey="notProvided"
				zoneValue={""}
				stateValue={""}
				onStateChange={jest.fn()}
				stateOptions={[]}
				onZoneChange={jest.fn()}
				zoneOptions={["option1", "option2", "option3"]}
				onFindChange={jest.fn()}
				findValue={""}
				isFindEnabled={true}
				onSubmit={jest.fn()}
				sortAlphabeticallyStoresZonesStatus={undefined}
			/>
		);

		const submitButton = screen.getByText(
			"dashboardPage.opticalStore.filterForm.find"
		);
		expect(submitButton).toBeDisabled();
	});
});
