import AzureConfigurationService from "./index";
import { getCurrentInstanceEnv, ENV, Instance } from "../ConfigService";

jest.mock("../ConfigService");

describe("getConfig", () => {
	describe("scenario: AU instance", () => {
		it("should return the AU/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.AU,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_local",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_local",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the AU/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.AU,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "7433bc91-dca1-462a-ac1a-4106c8ace13d",
				policies: {
					registration: {
						name: "b2c_1a_signup_scdf",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_scdf",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_scdf",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_scdf",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_scdf",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_scdf",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the AU/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.AU,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "3d5b00cf-5963-4f0b-bc40-20563be0627a",
				policies: {
					registration: {
						name: "b2c_1a_signup_scdf",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_scdf",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_scdf",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_scdf",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_scdf",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_scdf",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the AU/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.AU,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "77d489b0-3907-43f6-b391-4a41c131f7a1",
				policies: {
					registration: {
						name: "b2c_1a_signup_scdf",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_scdf",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_scdf",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_scdf",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_scdf",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_scdf",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});

	describe("scenario: TW instance", () => {
		it("should return the TW/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.TW,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local_ngyu",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					login: {
						name: "b2c_1a_signin_local_ngyu",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_local_ngyu",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the TW/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.TW,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "c9f1a4a7-4034-466d-95b1-f15fa90797a5",
				policies: {
					registration: {
						name: "b2c_1a_signup_ngyu",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					login: {
						name: "b2c_1a_signin_ngyu",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_ngyu",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the TW/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.TW,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "491ce02e-761f-4f97-b980-e0afef47fb23",
				policies: {
					registration: {
						name: "b2c_1a_signup_ngyu",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					login: {
						name: "b2c_1a_signin_ngyu",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_ngyu",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the TW/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.TW,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "5b092536-cdd3-4f54-ba29-af3587266813",
				policies: {
					registration: {
						name: "b2c_1a_signup_ngyu",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					login: {
						name: "b2c_1a_signin_ngyu",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_ngyu",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_ngyu",
						extraQueryParameters: { ui_locales: "zh-tw" },
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});

	describe("scenario: NZ instance", () => {
		it("should return the NZ/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.NZ,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local_bkpc",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local_bkpc",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_local_bkpc",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local_bkpc",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_local_bkpc",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local_bkpc",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the NZ/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.NZ,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "472a8d5c-fdd2-4248-96d8-2adfcbd2ba40",
				policies: {
					registration: {
						name: "b2c_1a_signup_bkpc",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_bkpc",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_bkpc",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_bkpc",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_bkpc",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_bkpc",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the NZ/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.NZ,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "08aa65b3-87c7-40d5-b3cc-b7b811392501",
				policies: {
					registration: {
						name: "b2c_1a_signup_bkpc",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_bkpc",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_bkpc",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_bkpc",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_bkpc",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_bkpc",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the NZ/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.NZ,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "fb02cbfd-f865-4bd8-9c02-66fc3ec1f8fd",
				policies: {
					registration: {
						name: "b2c_1a_signup_bkpc",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_bkpc",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_bkpc",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_bkpc",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_bkpc",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_bkpc",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});

	describe("scenario: SG instance", () => {
		it("should return the SG/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.SG,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local_zulw",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local_zulw",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_local_zulw",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local_zulw",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_local_zulw",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local_zulw",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the SG/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.SG,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "2a2a60e5-b1e7-4c7a-a066-728cdcab320f",
				policies: {
					registration: {
						name: "b2c_1a_signup_zulw",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_zulw",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_zulw",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_zulw",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_zulw",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_zulw",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the SG/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.SG,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "4a21c5bf-309e-4bc0-a398-794e32ee05ab",
				policies: {
					registration: {
						name: "b2c_1a_signup_zulw",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_zulw",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_zulw",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_zulw",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_zulw",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_zulw",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the SG/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.SG,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "3c90e211-b001-4785-9b91-13834904da86",
				policies: {
					registration: {
						name: "b2c_1a_signup_zulw",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_zulw",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_zulw",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_zulw",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_zulw",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_zulw",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});

	describe("scenario: MY instance", () => {
		it("should return the MY/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.MY,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local_pvaq",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local_pvaq",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_local_pvaq",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local_pvaq",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_local_pvaq",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local_pvaq",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the MY/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.MY,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "67057ae3-8e0c-44c2-b148-1a083f33a343",
				policies: {
					registration: {
						name: "b2c_1a_signup_pvaq",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_pvaq",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_pvaq",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_pvaq",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_pvaq",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_pvaq",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the MY/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.MY,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "e110de59-e99c-45bb-a4cc-90685ecebe9b",
				policies: {
					registration: {
						name: "b2c_1a_signup_pvaq",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_pvaq",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_pvaq",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_pvaq",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_pvaq",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_pvaq",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the MY/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.MY,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "2dfc760d-ae68-4037-818e-3237eb914b00",
				policies: {
					registration: {
						name: "b2c_1a_signup_pvaq",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_pvaq",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_pvaq",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_pvaq",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_pvaq",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_pvaq",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});

	describe("scenario: HK instance", () => {
		it("should return the HK/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.HK,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local_afmt",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					login: {
						name: "b2c_1a_signin_local_afmt",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_local_afmt",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the HK/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.HK,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "16dd22ca-f1fb-4a84-953c-0555d2cdbb80",
				policies: {
					registration: {
						name: "b2c_1a_signup_afmt",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					login: {
						name: "b2c_1a_signin_afmt",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_afmt",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the HK/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.HK,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "512515b4-5136-45e9-930b-c478d3780117",
				policies: {
					registration: {
						name: "b2c_1a_signup_afmt",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					login: {
						name: "b2c_1a_signin_afmt",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_afmt",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the HK/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.HK,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "cf500b2c-d2f1-4c72-8d76-78314a2911d2",
				policies: {
					registration: {
						name: "b2c_1a_signup_afmt",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					login: {
						name: "b2c_1a_signin_afmt",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
					updatePassword: {
						name: "b2c_1a_change_password_afmt",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_afmt",
						extraQueryParameters: { ui_locales: "zh-hk" },
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});

	describe("scenario: TH instance", () => {
		it("should return the TH/LOCAL config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.LOCAL,
				instance: Instance.TH,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
				policies: {
					registration: {
						name: "b2c_1a_signup_local_mshp",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_local_mshp",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_local_mshp",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_local_mshp",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_local_mshp",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_local_mshp",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the TH/DEV config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.DEV,
				instance: Instance.TH,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "e83932bb-0bb8-43e3-b9c0-4453ab4dbd75",
				policies: {
					registration: {
						name: "b2c_1a_signup_mshp",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signup_mshp",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_mshp",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_signin_mshp",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_mshp",
						authority:
							"https://xIAMASPAC0.b2clogin.com/xIAMASPAC0.onmicrosoft.com/b2c_1a_change_password_mshp",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC0.b2clogin.com",
			});
		});

		it("should return the TH/STAGING config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.STAGING,
				instance: Instance.TH,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "fb795281-1760-4d88-83c0-cb1488e26e1a",
				policies: {
					registration: {
						name: "b2c_1a_signup_mshp",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signup_mshp",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_mshp",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_signin_mshp",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_mshp",
						authority:
							"https://xIAMASPAC1.b2clogin.com/xIAMASPAC1.onmicrosoft.com/b2c_1a_change_password_mshp",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPAC1.b2clogin.com",
			});
		});

		it("should return the TH/PROD config", () => {
			(getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				env: ENV.PROD,
				instance: Instance.TH,
			});

			const config = AzureConfigurationService.getConfig();

			expect(config).toStrictEqual({
				clientId: "52b61dbf-de8f-4a14-ad9a-aaa0de91afd2",
				policies: {
					registration: {
						name: "b2c_1a_signup_mshp",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signup_mshp",
						extraQueryParameters: undefined,
					},
					login: {
						name: "b2c_1a_signin_mshp",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_signin_mshp",
						extraQueryParameters: undefined,
					},
					updatePassword: {
						name: "b2c_1a_change_password_mshp",
						authority:
							"https://xIAMASPACProd.b2clogin.com/xIAMASPACProd.onmicrosoft.com/b2c_1a_change_password_mshp",
						extraQueryParameters: undefined,
					},
				},
				authorityDomain: "xIAMASPACProd.b2clogin.com",
			});
		});
	});
});
