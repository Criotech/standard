import FeatureSwitch from "./index";
import { render, screen, act } from "@testing-library/react";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";
import { mocked } from "ts-jest/utils";
import { useState } from "react";

jest.mock("../../hooks/useFeatureSwitch");

describe("FeatureSwitch Component", () => {
	let rerunHook: (returnValue: any) => void;
	beforeEach(() => {
		mocked(useFeatureSwitch).mockImplementation(() => {
			const [returnValue, setReturnValue] = useState<any>([
				undefined,
				false,
			]);
			rerunHook = setReturnValue;
			return returnValue;
		});
	});

	it("should not render when fs is not ready", async () => {
		render(
			<FeatureSwitch name={"addressFormType"} value={"VARIATION1"}>
				<div data-testid="test-id">value</div>
			</FeatureSwitch>
		);

		const content = await screen.queryByTestId("test-id");
		expect(content).toBeNull();
	});

	it("should render when fs load fail but is control", async () => {
		render(
			<FeatureSwitch
				control
				name={"addressFormType"}
				value={"VARIATION1"}
			>
				<div data-testid="test-id">value</div>
			</FeatureSwitch>
		);

		const contentBefore = await screen.queryByTestId("test-id");
		expect(contentBefore).toBeNull();

		act(() => {
			rerunHook([undefined, true]);
		});

		const contentAfter = await screen.findByTestId("test-id");
		expect(contentAfter).toBeInTheDocument();
	});

	it("should not render when fs load fail but is not control", async () => {
		render(
			<FeatureSwitch name={"addressFormType"} value={"VARIATION1"}>
				<div data-testid="test-id">value</div>
			</FeatureSwitch>
		);

		const contentBefore = await screen.queryByTestId("test-id");
		expect(contentBefore).toBeNull();

		act(() => {
			rerunHook([undefined, true]);
		});

		const content = await screen.queryByTestId("test-id");
		expect(content).toBeNull();
	});

	it("should render when fs value match", async () => {
		render(
			<FeatureSwitch name={"addressFormType"} value={"VARIATION1"}>
				<div data-testid="test-id">value</div>
			</FeatureSwitch>
		);

		const contentBefore = await screen.queryByTestId("test-id");
		expect(contentBefore).toBeNull();

		act(() => {
			rerunHook(["VARIATION1", true]);
		});

		const contentAfter = await screen.findByTestId("test-id");
		expect(contentAfter).toBeInTheDocument();
	});
});
