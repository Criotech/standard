import { render, screen } from "./index";
import Select from "../components/Select";

it("should throw when calling getAntSelect and there is no ant select present", async () => {
	render(<div />);
	expect(() => screen.getAntSelect()).toThrowError(
		"Could not find any element with the class .ant-select-selector"
	);
});

it("should throw when calling getAntSelect and there are multiple ant selects present", async () => {
	render(
		<div>
			<Select></Select>
			<Select></Select>
		</div>
	);
	expect(() => screen.getAntSelect()).toThrowError(
		"Found multiple elements with the class .ant-select-selector"
	);
});
