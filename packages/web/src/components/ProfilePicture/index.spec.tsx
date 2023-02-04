import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import ProfilePicture, { PictureSize } from ".";
import AvatarIcon from "../../icons/AvatarIcon";
import LinePicture from "../LinePicture";
import { LineAuthStatus, LineContext } from "../../contexts/LineContext";

jest.mock("../../icons/AvatarIcon", () => ({
	__esModule: true,
	PictureSize: {
		SMALL: "40px",
		MEDIUM: "48px",
	},
	default: ({ size }: ComponentProps<typeof AvatarIcon>) => (
		<div data-testid="avatar-icon">{size}</div>
	),
}));

jest.mock("../LinePicture", () => ({
	__esModule: true,
	PictureSize: {
		SMALL: "40px",
		MEDIUM: "48px",
	},
	default: ({ pictureUrl, size }: ComponentProps<typeof LinePicture>) => (
		<div data-testid="line-picture">
			<span>{size}</span>
			<span>{pictureUrl}</span>
		</div>
	),
}));

it("should render line picture if line profile is provided with a picture url", () => {
	render(
		<LineContext.Provider
			value={{
				status: LineAuthStatus.AUTHENTICATED,
				lineProfile: {
					lineId: "sample-line-id",
					displayName: "string",
					pictureUrl: "string",
					statusMessage: "string",
					isFriend: true,
				},
			}}
		>
			<ProfilePicture size={PictureSize.SMALL} />
		</LineContext.Provider>
	);

	const lineProfilePicture = screen.getByTestId("line-picture");
	expect(lineProfilePicture).toBeInTheDocument();
});

it("should display avatar icon if line profile is provided without a picture url", () => {
	render(
		<LineContext.Provider
			value={{
				status: LineAuthStatus.AUTHENTICATED,
				lineProfile: {
					lineId: "sample-line-id",
					displayName: "string",
					pictureUrl: "",
					statusMessage: "string",
					isFriend: true,
				},
			}}
		>
			<ProfilePicture size={PictureSize.SMALL} />
		</LineContext.Provider>
	);
	const avatarIcon = screen.getByTestId("avatar-icon");
	expect(avatarIcon).toBeInTheDocument();
});

it("should render avatar icon if line profile is not provided", () => {
	render(
		<LineContext.Provider
			value={{
				status: LineAuthStatus.AUTHENTICATED,
				lineProfile: {
					lineId: "",
					displayName: "",
					pictureUrl: "",
					statusMessage: "",
					isFriend: true,
				},
			}}
		>
			<ProfilePicture size={PictureSize.SMALL} />
		</LineContext.Provider>
	);

	const avatarIcon = screen.getByTestId("avatar-icon");
	expect(avatarIcon).toBeInTheDocument();
});

it("should render avatar icon with correct size", () => {
	render(
		<LineContext.Provider
			value={{
				status: LineAuthStatus.AUTHENTICATED,
				lineProfile: {
					lineId: "sample-line-id",
					displayName: "string",
					pictureUrl: "",
					statusMessage: "string",
					isFriend: true,
				},
			}}
		>
			<ProfilePicture size={PictureSize.SMALL} />
		</LineContext.Provider>
	);
	const avatarIcon = screen.getByTestId("avatar-icon");
	expect(avatarIcon).toBeInTheDocument();
	expect(avatarIcon).toHaveTextContent(PictureSize.SMALL);
});

it("should render Line picture with correct size", () => {
	render(
		<LineContext.Provider
			value={{
				status: LineAuthStatus.AUTHENTICATED,
				lineProfile: {
					lineId: "sample-line-id",
					displayName: "string",
					pictureUrl: "fake-picture-url",
					statusMessage: "string",
					isFriend: true,
				},
			}}
		>
			<ProfilePicture size={PictureSize.SMALL} />
		</LineContext.Provider>
	);
	const linePicture = screen.getByTestId("line-picture");
	expect(linePicture).toBeInTheDocument();
	expect(linePicture).toHaveTextContent(PictureSize.SMALL);
	expect(linePicture).toHaveTextContent("fake-picture-url");
});
