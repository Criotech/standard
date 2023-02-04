import { render, screen } from "@testing-library/react";
import LinePicture from ".";
import { PictureSize } from "../ProfilePicture";
import { ComponentProps } from "react";

const fakePictureUrl = "imageUrl";

jest.mock("../LinePicture", () => ({
	__esModule: true,
	default: ({ pictureUrl, size }: ComponentProps<typeof LinePicture>) => (
		<div data-testid="line-picture">
			<span>{size}</span>
			<span>{pictureUrl}</span>
		</div>
	),
}));

describe("LinePicture", () => {
	it("should render without errors", () => {
		render(<LinePicture pictureUrl={fakePictureUrl} />);
	});

	it("should render with right props", () => {
		render(
			<LinePicture pictureUrl={fakePictureUrl} size={PictureSize.SMALL} />
		);
		const linePicture = screen.getByTestId("line-picture");
		expect(linePicture).toHaveTextContent(String(PictureSize.SMALL));
		expect(linePicture).toHaveTextContent(fakePictureUrl);
	});
});
