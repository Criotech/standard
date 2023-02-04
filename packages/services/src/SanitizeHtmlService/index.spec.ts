import SanitizeHtmlService from "./index";
import sanitize from "sanitize-html";

jest.mock("sanitize-html", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const { sanitizeHtml } = SanitizeHtmlService;

describe("sanitizeHtml", () => {
	it("should", async () => {
		(sanitize as unknown as jest.Mock).mockReturnValue("sanitized html");

		const sanitizedHtml = await sanitizeHtml("dirty html");

		expect(sanitizedHtml).toStrictEqual("sanitized html");
		expect(sanitize).toHaveBeenCalledWith("dirty html", expect.anything());
	});
});
