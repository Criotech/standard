import { render } from "@testing-library/react";
import { ComponentProps } from "react";
import JoinNowBodyParagraph from ".";
import Text from "../../../components/Text";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("JoinNowBodyParagraph", () => {
	it("should render without errors", () => {
		render(<JoinNowBodyParagraph />);
	});
});
