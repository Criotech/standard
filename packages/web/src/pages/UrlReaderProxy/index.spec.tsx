import UrlReaderProxy from "./index";
import { act, render } from "@testing-library/react";
import { useQuery } from "../../hooks/useQuery";
import { useHistory } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../hooks/useQuery", () => ({
	useQuery: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useQuery as jest.Mock).mockReturnValue(
		new URLSearchParams(
			"?data=eyJrZXkxIjogInZhbHVlMSIsICJrZXkyIjogInZhbHVlMiJ9"
		)
	);
});

describe("UrlReaderProxy", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<UrlReaderProxy />);
		});
	});
});
