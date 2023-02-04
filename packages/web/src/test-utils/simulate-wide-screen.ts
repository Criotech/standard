function simulateWideScreen(): void {
	window.matchMedia = (query) => ({
		matches: true,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	});
}

export { simulateWideScreen };
