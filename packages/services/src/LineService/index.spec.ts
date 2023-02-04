import liff from "@line/liff";
import { createPermanentLink, getProfile } from "./index";
import WindowService from "../WindowService";

jest.mock("@line/liff", () => ({
	__esModule: true,
	default: {
		permanentLink: {
			createUrl: jest.fn(),
			setExtraQueryParam: jest.fn(),
		},
		init: jest.fn(),
		isLoggedIn: jest.fn(),
		login: jest.fn(),
		getFriendship: jest.fn(),
		getProfile: jest.fn(),
	},
}));

jest.mock("../WindowService", () => ({
	getHost: jest.fn(),
	getPathname: jest.fn(),
}));

const { createUrl, setExtraQueryParam } = liff.permanentLink;
const {
	init,
	isLoggedIn,
	login,
	getFriendship,
	getProfile: liffGetProfile,
} = liff;

beforeEach(() => {
	jest.resetAllMocks();
	(createUrl as jest.Mock).mockReturnValue("permanent-link");
	(isLoggedIn as jest.Mock).mockReturnValue(false);
	(WindowService.getHost as jest.Mock).mockReturnValue("host");
	(WindowService.getPathname as jest.Mock).mockReturnValue("fake-pathname");
});

describe("getProfile", () => {
	it("should call init with the liff id, and isLoggedIn", async () => {
		await getProfile("liff id");
		expect(init).toHaveBeenCalledWith({ liffId: "liff id" });
		expect(isLoggedIn).toHaveBeenCalled();
	});

	it("should call login if isLoggedIn returns false", async () => {
		(isLoggedIn as jest.Mock).mockReturnValue(false);
		(WindowService.getHost as jest.Mock).mockReturnValue("fake-host");
		(WindowService.getPathname as jest.Mock).mockReturnValue(
			"/fake-pathname"
		);

		await getProfile("liff id");
		expect(login).toHaveBeenCalledWith({
			redirectUri: "https://fake-host/fake-pathname",
		});
	});

	it("should call getFriendship, getProfile, and return the received profile if isLoggedIn returns true", async () => {
		(isLoggedIn as jest.Mock).mockReturnValue(true);
		(getFriendship as jest.Mock).mockResolvedValue({
			friendFlag: true,
		});
		(liffGetProfile as jest.Mock).mockResolvedValue({
			userId: "user id",
			displayName: "display name",
			pictureUrl: "picture url",
			statusMessage: "status message",
		});

		const lineProfile = await getProfile("liff id");
		expect(getFriendship).toHaveBeenCalled();
		expect(liffGetProfile).toHaveBeenCalled();
		expect(lineProfile).toStrictEqual({
			lineId: "user id",
			displayName: "display name",
			pictureUrl: "picture url",
			statusMessage: "status message",
			isFriend: true,
		});
	});
});

describe("createPermanentLink", () => {
	it("should return the permanent link from liff", async () => {
		(createUrl as jest.Mock).mockReturnValue("permanent-link");

		const permanentUrl = await createPermanentLink("referralId=abc");

		expect(permanentUrl).toStrictEqual("permanent-link");
	});

	it("should call setExtraQueryParam when the query argument is defined", async () => {
		await createPermanentLink("referralId=abc");

		expect(setExtraQueryParam).toHaveBeenCalledWith("referralId=abc");
		expect(createUrl).toHaveBeenCalled();
	});

	it("should NOT call setExtraQueryParam when the query argument is undefined", async () => {
		await createPermanentLink();

		expect(setExtraQueryParam).not.toHaveBeenCalled();
		expect(createUrl).toHaveBeenCalled();
	});
});
