import WindowService from "../WindowService";
import { LogType } from "./index";

jest.mock("../WindowService", () => ({
	getItemFromLocalStorage: jest.fn(),
	console: {
		debug: jest.fn(),
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn(),
	},
}));

describe("LoggerService", () => {
	beforeEach(() => {
		(WindowService.getItemFromLocalStorage as jest.Mock).mockReturnValue(
			LogType.warning
		);
	});

	it("should log with correct level", () => {
		const LoggerService = require("./index").default;

		LoggerService.debug("test-debug");
		LoggerService.info("test-info");
		LoggerService.warning("test-warn");
		LoggerService.error("test-error");

		expect(WindowService.console.debug).not.toHaveBeenCalled();
		expect(WindowService.console.info).not.toHaveBeenCalled();
		expect(WindowService.console.warn).toHaveBeenNthCalledWith(
			1,
			"test-warn"
		);
		expect(WindowService.console.error).toHaveBeenNthCalledWith(
			1,
			"test-error"
		);
	});
});
