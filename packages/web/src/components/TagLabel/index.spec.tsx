import { render, screen } from "@testing-library/react";
import TagLabel from "./index";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import { ComponentProps } from "react";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <div>{textKey}</div>,
}));

const tag = "fakeTag";

describe("TagLabel", () => {
	it("should render without errors", () => {
		render(<TagLabel labelKey={tag as TranslationKey} />);
	});

	it("should render tag text", () => {
		render(<TagLabel labelKey={tag as TranslationKey} />);
		expect(screen.queryByText("fakeTag")).toBeInTheDocument();
	});
});
