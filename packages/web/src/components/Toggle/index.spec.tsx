import Toggle from "./index";
import { render, screen } from "@testing-library/react";
import { TabsProps } from "rc-tabs/lib/Tabs";
import { TabPaneProps } from "rc-tabs/lib/TabPanelList/TabPane";

jest.mock("antd", () => {
	const TabsMock = ({ className, activeKey, children }: TabsProps) => (
		<>
			<div data-testid="fakeTabsClass">{className}</div>
			<div data-testid="fakeActiveKey">{activeKey}</div>
			<div data-testid="fakeChildren">{children}</div>
		</>
	);
	TabsMock.TabPane = ({ tab, tabKey }: TabPaneProps) => (
		<>
			<div data-testid="fakeTabPane">
				<div data-testid="fakeTabLabel">{tab}</div>
				<div data-testid="fakeTabKey">{tabKey}</div>
			</div>
		</>
	);
	return {
		Tabs: TabsMock,
	};
});

describe("Toggle", () => {
	it("should render without errors", () => {
		render(<Toggle />);
	});

	it("should include the default className", () => {
		render(<Toggle />);
		expect(screen.getByTestId("fakeTabsClass")).toHaveTextContent(
			"acuvue-toggle"
		);
	});

	it("should keep the default className", () => {
		render(<Toggle className="class2 class3" />);
		expect(screen.getByTestId("fakeTabsClass")).toHaveTextContent(
			"acuvue-toggle class2 class3"
		);
	});

	it("should send the value to the Tab active key", () => {
		const value = "some value";
		render(<Toggle value={value} />);
		expect(screen.getByTestId("fakeActiveKey")).toHaveTextContent(value);
	});

	it("should create the correct number of TabPane: 1", () => {
		const items = [{ label: "label1", value: "value1" }];
		render(<Toggle items={items} />);
		expect(screen.getAllByTestId("fakeTabPane")).toHaveLength(1);
	});

	it("should create the correct number of TabPane: 2", () => {
		const items = [
			{ label: "label1", value: "value1" },
			{ label: "label2", value: "value2" },
		];
		render(<Toggle items={items} />);
		expect(screen.getAllByTestId("fakeTabPane")).toHaveLength(2);
	});

	it("should send label and value to TabPane", () => {
		const items = [{ label: "label1", value: "value1" }];
		render(<Toggle items={items} />);
		expect(screen.getByTestId("fakeTabLabel")).toHaveTextContent("label1");
		expect(screen.getByTestId("fakeTabKey")).toHaveTextContent("value1");
	});
});
