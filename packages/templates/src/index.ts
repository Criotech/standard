import { join } from "path";
import {
	readdirSync,
	readFileSync,
	writeFileSync,
	rmSync,
	mkdirSync,
} from "fs";

const rootDir = __dirname;
const templatesDir = join(rootDir, "html");
const defaultsDir = join(rootDir, "defaults");
const targetDir = join(rootDir, "..", "..", "web", "public", "xiam-templates");

function main() {
	const defaultStyleContent = readFileSync(
		join(defaultsDir, "default-style.css"),
		"utf8"
	);
	const defaultScriptContent = readFileSync(
		join(defaultsDir, "default-script.js"),
		"utf8"
	);

	rmSync(targetDir, { recursive: true, force: true });
	mkdirSync(targetDir);

	readdirSync(templatesDir).forEach((instanceFolderName) => {
		const instanceFolderPath = join(templatesDir, instanceFolderName);
		const targetFolderPath = join(targetDir, instanceFolderName);
		mkdirSync(targetFolderPath);

		readdirSync(instanceFolderPath).forEach((fileName) => {
			const filePath = join(instanceFolderPath, fileName);
			const targetFilePath = join(targetFolderPath, fileName);

			const fileContent = readFileSync(filePath, { encoding: "utf-8" });

			const newFileContent = fileContent
				.split(`<style id="myacuvue-style">`)
				.join(`<style id="myacuvue-style">${defaultStyleContent}`)
				.split(`<script id="myacuvue-script">`)
				.join(`<script id="myacuvue-script">${defaultScriptContent}`);

			writeFileSync(targetFilePath, newFileContent, {
				encoding: "utf-8",
			});
		});
	});
}

main();
