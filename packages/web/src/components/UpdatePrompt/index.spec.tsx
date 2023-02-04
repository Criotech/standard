import { act, findByText, render, screen } from "@testing-library/react";
import { UpdatePrompt } from "./index";
import { useService } from "../../hooks/useService";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import Text from "../Text";

jest.mock("../../hooks/useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("antd", () => ({
	Alert: ({ action }: PropsWithChildren<{ action: ReactNode }>) => (
		<div>{action}</div>
	),
	Button: ({ children }: PropsWithChildren<{}>) => (
		<button>{children}</button>
	),
}));

describe("Update Prompt", () => {
	beforeEach(() => {
		(useService as jest.Mock).mockReturnValue({
			WindowService: {
				reload: jest.fn(),
			},
			SWService: {
				register: jest.fn(),
			},
		});
	});

	it("should render", () => {
		render(<UpdatePrompt />);
	});

	it("should display prompt", async () => {
		const fakeWaitingWorker = {
			addEventListener: jest.fn(),
		};

		let onUpdate: Function;

		const { SWService } = useService();
		(SWService.register as jest.Mock).mockImplementation((config) => {
			onUpdate = config.onUpdate;
		});

		render(<UpdatePrompt />);
		expect(SWService.register).toHaveBeenCalled();

		await act(async () => {
			onUpdate({ waiting: fakeWaitingWorker });
		});

		expect(fakeWaitingWorker.addEventListener).toHaveBeenCalled();

		const prompt = screen.queryByText("updatePrompt.reload");
		expect(prompt).toBeInTheDocument();
	});

	it("should refresh page", async () => {
		let callback: Function = () => {};

		const fakeWaitingWorker = {
			addEventListener: jest
				.fn()
				.mockImplementation(
					(eventName: string, eventCallback: Function) => {
						callback = eventCallback;
					}
				),
			state: "activated",
		};

		let onActive: Function;

		const { SWService } = useService();
		(SWService.register as jest.Mock).mockImplementation((config) => {
			onActive = config.onActive;
		});

		render(<UpdatePrompt />);
		expect(SWService.register).toHaveBeenCalled();

		await act(async () => {
			onActive({ waiting: fakeWaitingWorker });
		});

		expect(fakeWaitingWorker.addEventListener).toHaveBeenCalled();

		const prompt = screen.queryByText("updatePrompt.reload");
		expect(prompt).toBeInTheDocument();

		callback();

		const { WindowService } = useService();
		expect(WindowService.reload).toHaveBeenCalled();
	});
});
