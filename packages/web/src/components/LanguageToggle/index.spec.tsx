import { render, screen } from "@testing-library/react";
import LanguageToggle from "./index";
import { useTranslation } from "../../hooks/useTranslation";
import Toggle from "../Toggle";
import { ComponentProps } from "react";

const mockContextValue = {
	language: "aa",
	setLanguage: jest.fn(),
	languages: ["aa", "bb"],
	languageNames: {
		aa: "aaLanguage",
		bb: "bbLanguage",
	},
};

jest.mock("../../hooks/useTranslation", () => ({
	useTranslation: jest.fn(),
}));

jest.mock("../../components/Toggle", () => ({
	__esModule: true,
	default: ({ className, value, items }: ComponentProps<typeof Toggle>) => (
		<>
			<div data-testid="fakeToggleClass">{className}</div>
			<div data-testid="fakeToggleLanguage">{value}</div>
			<div data-testid="fakeToggleItems">
				{items?.map(({ value, label }) => (
					<div key={value} data-testid={value}>
						{label}
					</div>
				))}
			</div>
		</>
	),
}));

describe("LanguageToggle", () => {
	it("should render without errors", () => {
		(useTranslation as jest.Mock).mockReturnValue(mockContextValue);
		render(<LanguageToggle />);
	});

	it("should include the className", () => {
		(useTranslation as jest.Mock).mockReturnValue(mockContextValue);
		render(<LanguageToggle />);
		expect(screen.getByTestId("fakeToggleClass")).toHaveTextContent(
			"language-toggle"
		);
	});

	it("should include the language from useTranslation", () => {
		(useTranslation as jest.Mock).mockReturnValue(mockContextValue);
		render(<LanguageToggle />);
		expect(screen.getByTestId("fakeToggleLanguage")).toHaveTextContent(
			mockContextValue.language
		);
	});

	it("should include the language options in items", () => {
		(useTranslation as jest.Mock).mockReturnValue(mockContextValue);
		render(<LanguageToggle />);
		expect(screen.getByTestId("aa")).toHaveTextContent("aaLanguage");
		expect(screen.getByTestId("bb")).toHaveTextContent("bbLanguage");
	});
});
