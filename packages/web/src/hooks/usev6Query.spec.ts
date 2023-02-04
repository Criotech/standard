import { renderHook } from "@testing-library/react-hooks";
import { useLocation } from "react-router-dom-v5-compat";
import { useQuery } from "./usev6Query";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useLocation: jest.fn().mockReturnValue(jest.fn()),
}));

beforeEach(() => {
	mocked(useLocation).mockReturnValue({
		search: "",
		key: "",
		hash: "",
		state: undefined,
		pathname: "",
	});
});

it("should return URLSearchParams built from location", async () => {
	mocked(useLocation).mockReturnValue({
		search: "city=Tokyo",
		key: "",
		hash: "",
		state: undefined,
		pathname: "",
	});

	const { result } = renderHook(() => useQuery());

	expect(result.current.get("city")).toStrictEqual("Tokyo");
});
