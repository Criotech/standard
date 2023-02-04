import * as main from "./index";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

jest.mock("fs", () => ({
	readdirSync: jest.fn().mockReturnValue(["foldera"]),
	readFileSync: jest
		.fn()
		.mockReturnValue(
			'<style id="myacuvue-style"></style><script id="myacuvue-script"></script>'
		),
	rmSync: jest.fn(),
	mkdirSync: jest.fn(),
	writeFileSync: jest.fn(),
}));

describe("main", () => {
	it("should read file", () => {
		main;

		expect(readFileSync).toHaveBeenNthCalledWith(
			1,
			join(join(__dirname, "defaults"), "default-style.css"),
			"utf8"
		);
		expect(readFileSync).toHaveBeenNthCalledWith(
			2,
			join(join(__dirname, "defaults"), "default-script.js"),
			"utf8"
		);
	});

	it("should remove target directory", () => {
		main;

		expect(rmSync).toHaveBeenCalledWith(
			join(__dirname, "..", "..", "web", "public", "xiam-templates"),
			{
				recursive: true,
				force: true,
			}
		);
	});

	it("should make target directory", () => {
		main;
		expect(mkdirSync).toHaveBeenNthCalledWith(
			1,
			join(__dirname, "..", "..", "web", "public", "xiam-templates")
		);
	});

	it("should recursively make a directory for each instance", () => {
		main;
		expect(mkdirSync).toHaveBeenNthCalledWith(
			1,
			join(__dirname, "..", "..", "web", "public", "xiam-templates")
		);
		expect(mkdirSync).toHaveBeenNthCalledWith(
			2,
			join(
				join(
					__dirname,
					"..",
					"..",
					"web",
					"public",
					"xiam-templates",
					"foldera"
				)
			)
		);
	});

	it("should read into each instance's files and read the content", () => {
		main;
		expect(readFileSync).toHaveBeenNthCalledWith(
			3,
			join(__dirname, "html", "foldera", "foldera"),
			{ encoding: "utf-8" }
		);
	});

	it("should populate default style content", () => {
		main;
		expect(writeFileSync).toHaveBeenCalledWith(
			join(
				__dirname,
				"..",
				"..",
				"web",
				"public",
				"xiam-templates",
				"foldera",
				"foldera"
			),
			'<style id="myacuvue-style"><style id="myacuvue-style"></style><script id="myacuvue-script"><style id="myacuvue-style"></style><script id="myacuvue-script"></script></script></style><script id="myacuvue-script"><style id="myacuvue-style"></style><script id="myacuvue-script"></script></script>',
			{ encoding: "utf-8" }
		);
	});
});
