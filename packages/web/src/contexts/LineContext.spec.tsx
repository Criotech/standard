import { renderHook } from "@testing-library/react-hooks";
import { ComponentProps } from "react";
import { LineAuthStatus, LineProvider, useLine } from "./LineContext";
import { useConfiguration } from "../hooks/useConfiguration";
import { useService } from "../hooks/useService";
import { waitFor } from "@testing-library/react";
import { mocked } from "ts-jest/utils";

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../hooks/useService", () => ({
	useService: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		lineConfig: { liffId: "fakeLiffId" },
	});

	(useService as jest.Mock).mockReturnValue({
		LineService: {
			getProfile: jest.fn(),
		},
	});
});

describe("LineContext", () => {
	it("should provide correct line profile and status", async () => {
		mocked(useService().LineService.getProfile).mockResolvedValue({
			displayName: "Display Name",
			isFriend: false,
			lineId: "line id",
		});

		const { result } = renderHook(() => useLine(), {
			wrapper: ({ children }: ComponentProps<typeof LineProvider>) => (
				<LineProvider>{children}</LineProvider>
			),
		});

		await waitFor(() => {
			expect(result.current.lineProfile).toStrictEqual({
				displayName: "Display Name",
				isFriend: false,
				lineId: "line id",
			});

			expect(result.current.status).toStrictEqual(
				LineAuthStatus.AUTHENTICATED
			);
		});
	});
});
