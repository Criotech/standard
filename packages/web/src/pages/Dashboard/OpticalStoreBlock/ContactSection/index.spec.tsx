import { render, screen } from "@testing-library/react";
import ContactSection from ".";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("ContactSection", () => {
	it("should render without erros", () => {
		render(<ContactSection telephone="+65 6465 0213" />);
	});

	it("should render contact title", () => {
		render(<ContactSection telephone="" />);

		const contactTitle = screen.getByText(
			"dashboardPage.opticalStore.contact"
		);
		expect(contactTitle).toBeInTheDocument();
	});

	it("should render passed telephone prop text", () => {
		render(<ContactSection telephone="+65 6465 0213" />);

		const telephoneNo = screen.getByText("+65 6465 0213");
		expect(telephoneNo).toBeInTheDocument();
	});
});
