import { act, render } from "@testing-library/react";
import jsbarcode from "jsbarcode";
import Barcode from "./index";

jest.mock("jsbarcode", () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe("Barcode", () => {
	it("should call jsbarcode with same value sent to component", async () => {
		await act(async () => {
			render(<Barcode value="some value" />);
		});
		expect(jsbarcode).toHaveBeenCalledWith("#barcode", "some value", {
			displayValue: false,
		});
	});

	it("should render the svg with the barcode", async () => {
		let container: HTMLElement;
		await act(async () => {
			const { container: barcodeContainer } = render(
				<Barcode value="some value" />
			);
			container = barcodeContainer;
		});

		const barcodeSvg = container!.querySelector("svg#barcode");
		expect(barcodeSvg).toBeInTheDocument();
	});
});
