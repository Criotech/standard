import { render, screen } from "@testing-library/react";
import MyProfileBlock from ".";
import { useDate } from "../../../hooks/useDate";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import BlockTitle from "../../Dashboard/BlockTitle";

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../hooks/useDate", () => ({
	useDate: jest.fn().mockReturnValue({
		shortDateToDisplay: jest.fn(),
	}),
}));

describe("MyProfileBlock", () => {
	beforeEach(() => {
		(useDate as jest.Mock).mockReturnValue({
			shortDateToDisplay: jest.fn(),
			getDateFromString: jest.fn(),
		});
	});

	it("should render without errors", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);
	});

	it("should render correct title", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const title = screen.getByTestId("block-title");
		expect(title).toHaveTextContent("profilePage.myProfileBlock.myProfile");
	});

	it("should render correct first name label", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const firstNameLabel = screen.getByText(
			"profilePage.myProfileBlock.firstName:"
		);
		expect(firstNameLabel).toBeInTheDocument();
	});

	it("should render correct first name value", () => {
		render(
			<MyProfileBlock
				firstName={"fakeFirstName"}
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const firstNameValue = screen.getByText("fakeFirstName");
		expect(firstNameValue).toBeInTheDocument();
	});

	it("should render correct last name label", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const lastNameLabel = screen.getByText(
			"profilePage.myProfileBlock.lastName:"
		);
		expect(lastNameLabel).toBeInTheDocument();
	});

	it("should render correct last name value", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName={"fakeLastName"}
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const lastNameValue = screen.getByText("fakeLastName");
		expect(lastNameValue).toBeInTheDocument();
	});

	it("should render correct email label", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const emailLabel = screen.getByText(
			"profilePage.myProfileBlock.email:"
		);
		expect(emailLabel).toBeInTheDocument();
	});

	it("should render correct email value", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email={"fakeEmail"}
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const emailValue = screen.getByText("fakeEmail");
		expect(emailValue).toBeInTheDocument();
	});

	it("should render correct DateOfBirth label", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const dOBLabel = screen.getByText(
			"profilePage.myProfileBlock.dateOfBirth:"
		);
		expect(dOBLabel).toBeInTheDocument();
	});

	it("should render correct DateOfBirth value", () => {
		(useDate().shortDateToDisplay as jest.Mock).mockReturnValue("Mar 2000");

		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth="03"
				birthYear="2000"
				gender=""
			/>
		);

		const dOBValue = screen.getByText("Mar 2000");
		expect(dOBValue).toBeInTheDocument();
	});

	it("should render correct gender label", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender=""
			/>
		);

		const genderLabel = screen.getByText(
			"profilePage.myProfileBlock.gender:"
		);
		expect(genderLabel).toBeInTheDocument();
	});

	it("should render correct gender value", () => {
		render(
			<MyProfileBlock
				firstName=""
				lastName=""
				email=""
				birthMonth=""
				birthYear=""
				gender={"fakeGender"}
			/>
		);

		const genderValue = screen.getByText("fakeGender");
		expect(genderValue).toBeInTheDocument();
	});
});
