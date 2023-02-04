import {
	TranslationKey,
	TranslationType,
} from "@myacuvue_thailand_web/services";
import { renderHook } from "@testing-library/react-hooks";
import { useText } from "./useText";
import { useTranslation } from "./useTranslation";

jest.mock("./useTranslation", () => ({
	useTranslation: jest.fn(),
}));

describe("useText", () => {
	beforeEach(() => {
		(useTranslation as jest.Mock).mockReturnValue({
			t: jest.fn().mockResolvedValue("translated text"),
		});
	});

	it("should return translated text", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useText("testTranslationKey" as TranslationKey)
		);
		await waitForNextUpdate();
		const translatedText = result.current;
		expect(translatedText).toStrictEqual("translated text");
	});

	it("should call t from useTranslation", async () => {
		const { waitForNextUpdate } = renderHook(() =>
			useText("testTranslationKey" as TranslationKey)
		);
		await waitForNextUpdate();
		expect(useTranslation().t).toHaveBeenCalledWith(
			"testTranslationKey",
			TranslationType.default,
			undefined
		);
	});
});
