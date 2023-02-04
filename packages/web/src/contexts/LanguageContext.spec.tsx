import { renderHook } from "@testing-library/react-hooks";
import { ComponentProps } from "react";
import { LanguageProvider } from "./LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

import { useConfiguration } from "../hooks/useConfiguration";
import {
	TranslationKey,
	TranslationType,
	LanguageService,
	ConfigService,
} from "@myacuvue_thailand_web/services";

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	WindowService: {
		setLanguage: jest.fn(),
	},
	LanguageService: {
		getDefaultLanguage: jest.fn(),
		getLanguageNames: jest.fn(),
		getTranslation: jest.fn(),
		render: jest.fn(),
	},
	Language: { aa: "AA", bb: "BB" },
	TranslationType: {
		default: "default",
	},
	ConfigService: {
		getConfig: jest.fn(),
	},
}));

describe("LanguageContext", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			instance: "fakeInstance",
		});

		(LanguageService.getDefaultLanguage as jest.Mock).mockReturnValue("aa");
		(LanguageService.getLanguageNames as jest.Mock).mockReturnValue({
			aa: "AA",
			bb: "BB",
		});
		(LanguageService.getTranslation as jest.Mock).mockReturnValue({
			fakeKey: "fakeValue",
		});
		(LanguageService.render as jest.Mock).mockImplementation(
			(value) => "rendered_" + value
		);
	});

	it("should provide language", async () => {
		const { result } = renderHook(() => useTranslation(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LanguageProvider>) => (
				<LanguageProvider>{children}</LanguageProvider>
			),
		});

		expect(LanguageService.getDefaultLanguage).toHaveBeenCalled();
		expect(result.current.language).toStrictEqual("aa");
	});

	it("should provide translate", async () => {
		const { result } = renderHook(() => useTranslation(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LanguageProvider>) => (
				<LanguageProvider>{children}</LanguageProvider>
			),
		});

		const text = await result.current.translate(
			"fakeKey" as any as TranslationKey,
			TranslationType.default
		);

		expect(text).toEqual("rendered_fakeValue");
	});
});
