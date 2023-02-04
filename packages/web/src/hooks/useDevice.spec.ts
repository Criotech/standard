import { renderHook } from "@testing-library/react-hooks";
import { useLine } from "../contexts/LineContext";
import { useDevice } from "./useDevice";
import { mocked } from "ts-jest/utils";
import { waitFor } from "@testing-library/react";
import { ulid } from "ulid";

jest.mock("../contexts/LineContext", () => ({
	useLine: jest.fn(),
}));

jest.mock("ulid", () => ({
	ulid: jest.fn(),
}));

describe("getDeviceId", () => {
	it("should return LINE:lineId> when lineId is available", async () => {
		mocked(useLine).mockReturnValue({
			status: 0,
			lineProfile: {
				displayName: "Display Name",
				isFriend: false,
				lineId: "line id",
			},
		});

		const { result } = renderHook(() => useDevice());

		await waitFor(() => {
			expect(result.current.getDeviceId()).toStrictEqual("LINE:line id");
		});
	});

	it("should return ulid when lineId is NOT available", async () => {
		mocked(useLine).mockReturnValue({
			status: 0,
			lineProfile: undefined,
		});

		mocked(ulid).mockReturnValue("ulid generated id");

		const { result } = renderHook(() => useDevice());

		await waitFor(() => {
			expect(result.current.getDeviceId()).toStrictEqual(
				"ulid generated id"
			);
		});
	});
});
