import { buildQueries, queries } from "@testing-library/react";

const queryAllAntSelectOptions = (
	container: HTMLElement,
	name?: string
): HTMLElement[] => {
	let allNodes = [];
	if (name) {
		allNodes = queries.queryAllByText(container, name, {
			selector: ".ant-select-item-option-content",
		});
	} else {
		allNodes = Array.from(
			container.querySelectorAll<HTMLElement>(
				".ant-select-item-option-content"
			)
		);
	}

	return allNodes;
};

const getMultipleError = (_container: Element | null, name?: string) => {
	return `Found multiple elements with the class .ant-select-item-option-content and name: ${
		name || "undefined"
	}`;
};

const getMissingError = (_container: Element | null, name?: string) => {
	return `Could not find any element with the class .ant-select-item-option-content and name: ${
		name || "undefined"
	}`;
};

const [
	queryAntSelectOption,
	getAllAntSelectOptions,
	getAntSelectOption,
	findAllAntSelectOptions,
	findAntSelectOption,
] = buildQueries(queryAllAntSelectOptions, getMultipleError, getMissingError);

export {
	queryAntSelectOption,
	getAllAntSelectOptions,
	getAntSelectOption,
	findAllAntSelectOptions,
	findAntSelectOption,
};
