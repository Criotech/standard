import { render, screen } from "@testing-library/react";
import MemberCard, { IProps } from ".";
import { ComponentProps } from "react";
import Text from "../Text";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../Barcode", () => ({
	__esModule: true,
	default: () => <div data-testid="barcode">barcode</div>,
}));

const fakeMemberCard: IProps = {
	name: "test1 test2",
	memberId: "123456789",
	picture: <span>fake-picture</span>,
	badge: <span>fake-badge</span>,
};

describe("MemberCard", () => {
	it("should render without errors", () => {
		render(
			<MemberCard
				name={fakeMemberCard.name}
				memberId={fakeMemberCard.memberId}
				picture={fakeMemberCard.picture}
				badge={fakeMemberCard.badge}
			/>
		);
	});

	it("should render member card name,memberId,background image,picture and badge available", () => {
		render(
			<MemberCard
				name={fakeMemberCard.name}
				memberId={fakeMemberCard.memberId}
				picture={fakeMemberCard.picture}
				badge={fakeMemberCard.badge}
			/>
		);

		const name = screen.getByText(/test1 test2/i);
		expect(name).toBeInTheDocument();

		const memberIds = screen.getAllByText(fakeMemberCard.memberId);
		expect(memberIds[0]).toBeInTheDocument();
		expect(memberIds).toHaveLength(2);

		const picture = screen.getByText("fake-picture");
		expect(picture).toBeInTheDocument();

		const badge = screen.getByText("fake-badge");
		expect(badge).toBeInTheDocument();
	});

	it("should render scan description text", () => {
		render(
			<MemberCard
				name={fakeMemberCard.name}
				memberId={fakeMemberCard.memberId}
				picture={fakeMemberCard.picture}
				badge={fakeMemberCard.badge}
			/>
		);
		const scanDescription = screen.getByText(
			"memberIdPage.scanDescription"
		);
		expect(scanDescription).toBeInTheDocument();
		const scanCode = screen.getByTestId("barcode");
		expect(scanCode).toBeInTheDocument();
	});

	it("should render memberCard if badge not available", () => {
		const { container } = render(
			<MemberCard
				name={fakeMemberCard.name}
				memberId={fakeMemberCard.memberId}
				picture={fakeMemberCard.picture}
			/>
		);
		expect(container.textContent).not.toMatch("fake-badge");
	});
});
