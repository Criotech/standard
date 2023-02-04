import { renderHook } from "@testing-library/react-hooks";
import { usePromocodeBlock } from "./usePromocodeBlock";
import { mocked } from "ts-jest/utils";
import { useUser } from "../../../hooks/useUser";
import { GlobalError } from "@myacuvue_thailand_web/services";

jest.mock("../../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

beforeEach(() => {
	mocked(useUser).mockReturnValue({
		getProfile: jest.fn(),
		saveProfile: jest.fn(),
		updateAuthenticationDone: jest.fn(),
		generatePromocode: jest.fn(),
		getPromocode: jest.fn(),
	});
	const { getPromocode, generatePromocode } = useUser();
	mocked(getPromocode).mockResolvedValue({
		promocode: "fake-promocode",
		isTrialCompleted: false,
	});
	mocked(generatePromocode).mockResolvedValue({
		promocode: "fake-promocode",
		isTrialCompleted: false,
	});
});

describe("usePromocodeBlock", () => {
	it("should return correct promocode", async () => {
		const { getPromocode } = useUser();
		mocked(getPromocode).mockResolvedValue({
			promocode: "fake-promocode",
			isTrialCompleted: false,
		});

		const { result, waitForNextUpdate } = renderHook(() =>
			usePromocodeBlock()
		);

		await waitForNextUpdate();

		expect(result.current.isLoading).toStrictEqual(false);
		expect(result.current.promo).toStrictEqual({
			promocode: "fake-promocode",
			isTrialCompleted: false,
		});
	});

	it("should call generatePromocode if getPromocode returns error", async () => {
		const { generatePromocode, getPromocode } = useUser();
		mocked(getPromocode).mockRejectedValue({
			globalErrorData: {
				translationKey: "",
				translationData: {},
			},
		});
		mocked(generatePromocode).mockResolvedValue({
			promocode: "fake-promocode",
			isTrialCompleted: false,
		});
		const { waitForNextUpdate } = renderHook(() => usePromocodeBlock());

		await waitForNextUpdate();

		expect(generatePromocode).toHaveBeenCalled();
	});

	it("should return errorMessage when generatePromocode fails", async () => {
		const { generatePromocode, getPromocode } = useUser();
		mocked(getPromocode).mockRejectedValue(
			new GlobalError({
				"some-translation-key": {},
			})
		);
		mocked(generatePromocode).mockRejectedValue(
			new GlobalError({
				"some-translation-key": {},
			})
		);
		const { waitForNextUpdate, result } = renderHook(() =>
			usePromocodeBlock()
		);

		await waitForNextUpdate();

		expect(result.current.errorMessage?.translationKey).toStrictEqual(
			"some-translation-key"
		);
	});
});
