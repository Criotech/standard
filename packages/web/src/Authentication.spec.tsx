import { render, screen } from "@testing-library/react";
import { useConfiguration } from "./hooks/useConfiguration";
import Authentication from "./Authentication";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { ReactNode } from "react";

jest.mock("./hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

const PassThroughFakeComponent = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

jest.mock("./contexts/UserProfileContext", () => ({
	__esModule: true,
	UserProfileProvider: PassThroughFakeComponent,
}));

jest.mock("./contexts/DeviceTokenContext", () => ({
	__esModule: true,
	DeviceTokenProvider: PassThroughFakeComponent,
}));

jest.mock("./contexts/LineProviderProxy", () => ({
	__esModule: true,
	default: ({ children }: { children: ReactNode }) => {
		return <div data-testid="line-provider-proxy">{children}</div>;
	},
}));

jest.mock("./contexts/XiamContext", () => ({
	__esModule: true,
	XiamProvider: ({ children }: { children: ReactNode }) => {
		return <div data-testid="xiam-context">{children}</div>;
	},
}));

jest.mock("./contexts/AuthContext", () => ({
	__esModule: true,
	AuthProvider: ({ children }: { children: ReactNode }) => {
		return <div data-testid="auth-provider">{children}</div>;
	},
}));

jest.mock("./contexts/NeoAuthContext", () => ({
	__esModule: true,
	NeoAuthProvider: ({ children }: { children: ReactNode }) => {
		return <div data-testid="neo-auth-provider">{children}</div>;
	},
}));

describe("scenario: LINE/LEGACY authentication", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			authenticationType: ConfigService.AuthenticationType.LEGACY,
		});
	});

	it("should render LineProviderProxy", () => {
		render(<Authentication />);
		const lineProviderProxy = screen.getByTestId("line-provider-proxy");
		expect(lineProviderProxy).toBeInTheDocument();
	});

	it("should NOT render XiamProvider", async () => {
		render(<Authentication />);
		const xiamProvider = screen.queryByTestId("xiam-context");
		expect(xiamProvider).not.toBeInTheDocument();
	});

	it("should render AuthProvider", () => {
		render(<Authentication />);
		const authProvider = screen.getByTestId("auth-provider");
		expect(authProvider).toBeInTheDocument();
	});

	it("should NOT render NeoAuthProvider", async () => {
		render(<Authentication />);
		const neoAuthProvider = screen.queryByTestId("neo-auth-provider");
		expect(neoAuthProvider).not.toBeInTheDocument();
	});
});

describe("scenario: XIAM based authentication", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			authenticationType: ConfigService.AuthenticationType.XIAM,
		});
	});

	it("should render XiamProvider", () => {
		render(<Authentication />);
		const xiamProvider = screen.getByTestId("xiam-context");
		expect(xiamProvider).toBeInTheDocument();
	});

	it("should NOT render LineProviderProxy", () => {
		render(<Authentication />);
		const lineProviderProxy = screen.queryByTestId("line-provider-proxy");
		expect(lineProviderProxy).not.toBeInTheDocument();
	});

	it("should render NeoAuthProvider", async () => {
		render(<Authentication />);
		const neoAuthProvider = screen.getByTestId("neo-auth-provider");
		expect(neoAuthProvider).toBeInTheDocument();
	});

	it("should NOT render AuthProvider", () => {
		render(<Authentication />);
		const authProvider = screen.queryByTestId("auth-provider");
		expect(authProvider).not.toBeInTheDocument();
	});
});

describe("scenario: TOKEN based authentication", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			authenticationType: ConfigService.AuthenticationType.TOKEN_ONLY,
		});
	});

	it("should NOT render XiamProvider", async () => {
		render(<Authentication />);
		const xiamProvider = screen.queryByTestId("xiam-context");
		expect(xiamProvider).not.toBeInTheDocument();
	});

	it("should render AuthProvider", () => {
		render(<Authentication />);
		const authProvider = screen.getByTestId("auth-provider");
		expect(authProvider).toBeInTheDocument();
	});

	it("should NOT render NeoAuthProvider", async () => {
		render(<Authentication />);
		const neoAuthProvider = screen.queryByTestId("neo-auth-provider");
		expect(neoAuthProvider).not.toBeInTheDocument();
	});
});
