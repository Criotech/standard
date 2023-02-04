import { useTranslation } from "./useTranslation";
import { renderHook } from "@testing-library/react-hooks";
import { ComponentProps } from "react";
import { LanguageContext, LanguageProvider } from "../contexts/LanguageContext";
import { Language } from "@myacuvue_thailand_web/services";

describe("useTranslation", () => {
	it("should provide translation object", () => {
		const { result } = renderHook(() => useTranslation(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LanguageProvider>) => (
				<LanguageContext.Provider
					value={{
						language: Language.EN,
						setLanguage: jest.fn(),
						languageNames: {
							en: "English",
							th: "ไทย",
							zh: "华人",
						},
						languages: [Language.EN],
						translate: jest.fn(),
					}}
				>
					{children}
				</LanguageContext.Provider>
			),
		});

		expect(result.current.t).toBeDefined();
		expect(result.current.translate).toBeDefined();
		expect(result.current.setLanguage).toBeDefined();
		expect(result.current.languageNames).toBeDefined();
		expect(result.current.languages).toBeDefined();
		expect(result.current.language).toBeDefined();
	});
});
