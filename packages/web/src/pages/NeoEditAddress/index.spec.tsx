import { ConfigService } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import { useConfiguration } from "../../hooks/useConfiguration";
import NeoEditAddress from "./index";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../EditAddressWithNoAddressLine3", () => ({
	__esModule: true,
	default: () => <div data-testid="edit-address-with-no-address-line-3" />,
}));

jest.mock("../EditAddressWithNoCityNoState", () => ({
	__esModule: true,
	default: () => <div data-testid="edit-address-with-no-city-no-state" />,
}));

jest.mock("../EditAddressComplete", () => ({
	__esModule: true,
	default: () => <div data-testid="edit-address-complete" />,
}));

describe("NeoEditAddress", () => {
	it("should render EditAddressWithNoAddressLine3 when type is WITH_NO_ADDRESS_LINE_3", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			editAddressPageType:
				ConfigService.EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		});

		render(<NeoEditAddress />);

		const editAddressWithNoAddressLine3 = screen.getByTestId(
			"edit-address-with-no-address-line-3"
		);
		expect(editAddressWithNoAddressLine3).toBeInTheDocument();
	});

	it("should render EditAddressWithNoCityNoState when type is WITH_NO_CITY_NO_STATE", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			editAddressPageType:
				ConfigService.EditAddressPageType.WITH_NO_CITY_NO_STATE,
		});

		render(<NeoEditAddress />);

		const editAddress = screen.getByTestId(
			"edit-address-with-no-city-no-state"
		);
		expect(editAddress).toBeInTheDocument();
	});

	it("should render EditAddressComplete when type is COMPLETE_ADDRESS", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			editAddressPageType:
				ConfigService.EditAddressPageType.COMPLETE_ADDRESS,
		});

		render(<NeoEditAddress />);

		const editAddress = screen.getByTestId("edit-address-complete");
		expect(editAddress).toBeInTheDocument();
	});
});
