import {
	queries,
	render as originalRender,
	RenderOptions,
	screen as originalScreen,
	within,
} from "@testing-library/react";
import { createElement, FC, ReactElement } from "react";
import {
	findAllAntSelects,
	findAntSelect,
	getAllAntSelects,
	getAntSelect,
	queryAntSelect,
} from "./ant-select-queries";
import {
	findAllAntSelectOptions,
	findAntSelectOption,
	getAllAntSelectOptions,
	getAntSelectOption,
	queryAntSelectOption,
} from "./ant-select-option-queries";
import { LanguageProvider } from "../contexts/LanguageContext";
import { simulateWideScreen } from "./simulate-wide-screen";

const antSelectQueries = {
	queryAntSelect,
	getAllAntSelects,
	getAntSelect,
	findAllAntSelects,
	findAntSelect,
};

const antSelectOptionQueries = {
	findAllAntSelectOptions,
	findAntSelectOption,
	getAllAntSelectOptions,
	getAntSelectOption,
	queryAntSelectOption,
};

const customQueries = {
	...antSelectQueries,
	...antSelectOptionQueries,
};

const boundQueries = within<typeof customQueries>(document.body, customQueries);

const screen: typeof originalScreen & typeof boundQueries = {
	...originalScreen,
	...boundQueries,
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) => {
	const enhancedOptions: RenderOptions = {
		queries: { ...queries, ...customQueries },
		...options,
	};
	return originalRender(ui, enhancedOptions);
};

const renderWithLanguage = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "queries">
) => {
	const wrapUiIfNeeded = (innerElement: ReactElement): ReactElement => {
		const optionsWrapper = options?.wrapper;
		if (optionsWrapper) {
			return createElement(optionsWrapper, null, innerElement);
		} else {
			return innerElement;
		}
	};

	const RenderWrapper: FC = () => {
		return <LanguageProvider>{wrapUiIfNeeded(ui)}</LanguageProvider>;
	};

	const enhancedOptions: RenderOptions = {
		wrapper: RenderWrapper,
	};

	return render(ui, enhancedOptions);
};

export { screen, render, renderWithLanguage, simulateWideScreen };
