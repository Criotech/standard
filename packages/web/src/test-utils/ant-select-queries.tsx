import { buildQueries } from "@testing-library/react";

const queryAllAntSelects = (container: HTMLElement): HTMLElement[] => {
	return Array.from(container.querySelectorAll(".ant-select-selector"));
};

const getMultipleError = (_container: Element | null) => {
	return "Found multiple elements with the class .ant-select-selector";
};

const getMissingError = (_container: Element | null) => {
	return "Could not find any element with the class .ant-select-selector";
};

const [
	queryAntSelect,
	getAllAntSelects,
	getAntSelect,
	findAllAntSelects,
	findAntSelect,
] = buildQueries(queryAllAntSelects, getMultipleError, getMissingError);

export {
	queryAntSelect,
	getAllAntSelects,
	getAntSelect,
	findAllAntSelects,
	findAntSelect,
};
