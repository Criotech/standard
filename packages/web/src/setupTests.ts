import "@testing-library/jest-dom";

function fakeScrollTo(x: number, y: number): void;
function fakeScrollTo(options?: ScrollToOptions): void;
function fakeScrollTo(arg0?: number | ScrollToOptions, arg1?: number) {
	let options: ScrollToOptions | undefined;

	if (typeof arg0 === "number") {
		const x = arg0;
		const y = arg1;
		options = {
			left: x,
			top: y,
		};
	} else {
		options = arg0;
	}

	if (options?.top) {
		document.documentElement.scrollTop = options?.top;
	}
	if (options?.left) {
		document.documentElement.scrollLeft = options?.left;
	}
}

beforeEach(() => {
	window.matchMedia = (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	});

	window.scrollTo = fakeScrollTo;
});
