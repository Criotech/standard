import { getCurrentInstanceEnv, ENV, Instance } from "../ConfigService";

interface AzurePolicy {
	name: string;
	authority: string;
	extraQueryParameters?: Record<string, string>;
}

interface AzureConfiguration {
	clientId: string;
	policies: {
		registration: AzurePolicy;
		login: AzurePolicy;
		updatePassword: AzurePolicy;
	};
	authorityDomain: string;
}

const createConfiguration = (
	clientId: string,
	instanceCodeOrLocal: string,
	tenantName: string,
	extraQueryParameters?: Record<string, string>
): AzureConfiguration => {
	return {
		clientId,
		policies: {
			registration: {
				name: `b2c_1a_signup_${instanceCodeOrLocal}`,
				authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/b2c_1a_signup_${instanceCodeOrLocal}`,
				extraQueryParameters,
			},
			login: {
				name: `b2c_1a_signin_${instanceCodeOrLocal}`,
				authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/b2c_1a_signin_${instanceCodeOrLocal}`,
				extraQueryParameters,
			},
			updatePassword: {
				name: `b2c_1a_change_password_${instanceCodeOrLocal}`,
				authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/b2c_1a_change_password_${instanceCodeOrLocal}`,
				extraQueryParameters,
			},
		},
		authorityDomain: `${tenantName}.b2clogin.com`,
	};
};

const DEFAULT_DUMMY_CONFIGURATION: AzureConfiguration = {
	clientId: "",
	policies: {
		registration: {
			name: "",
			authority: "",
		},
		login: {
			name: "",
			authority: "",
		},
		updatePassword: {
			name: "",
			authority: "",
		},
	},
	authorityDomain: "",
};

const LOCAL_CONFIGURATION: AzureConfiguration = createConfiguration(
	"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
	"local",
	"xIAMASPAC0"
);

const azureConfigurationTH: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: createConfiguration(
		"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
		"local_mshp",
		"xIAMASPAC0"
	),
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"e83932bb-0bb8-43e3-b9c0-4453ab4dbd75",
		"mshp",
		"xIAMASPAC0"
	),
	[ENV.STAGING]: createConfiguration(
		"fb795281-1760-4d88-83c0-cb1488e26e1a",
		"mshp",
		"xIAMASPAC1"
	),
	[ENV.PROD]: createConfiguration(
		"52b61dbf-de8f-4a14-ad9a-aaa0de91afd2",
		"mshp",
		"xIAMASPACProd"
	),
};

const azureConfigurationHK: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: createConfiguration(
		"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
		"local_afmt",
		"xIAMASPAC0",
		{ ui_locales: "zh-hk" }
	),
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"16dd22ca-f1fb-4a84-953c-0555d2cdbb80",
		"afmt",
		"xIAMASPAC0",
		{ ui_locales: "zh-hk" }
	),
	[ENV.STAGING]: createConfiguration(
		"512515b4-5136-45e9-930b-c478d3780117",
		"afmt",
		"xIAMASPAC1",
		{ ui_locales: "zh-hk" }
	),
	[ENV.PROD]: createConfiguration(
		"cf500b2c-d2f1-4c72-8d76-78314a2911d2",
		"afmt",
		"xIAMASPACProd",
		{ ui_locales: "zh-hk" }
	),
};

const azureConfigurationMY: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: createConfiguration(
		"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
		"local_pvaq",
		"xIAMASPAC0"
	),
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"67057ae3-8e0c-44c2-b148-1a083f33a343",
		"pvaq",
		"xIAMASPAC0"
	),
	[ENV.STAGING]: createConfiguration(
		"e110de59-e99c-45bb-a4cc-90685ecebe9b",
		"pvaq",
		"xIAMASPAC1"
	),
	[ENV.PROD]: createConfiguration(
		"2dfc760d-ae68-4037-818e-3237eb914b00",
		"pvaq",
		"xIAMASPACProd"
	),
};

const azureConfigurationSG: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: createConfiguration(
		"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
		"local_zulw",
		"xIAMASPAC0"
	),
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"2a2a60e5-b1e7-4c7a-a066-728cdcab320f",
		"zulw",
		"xIAMASPAC0"
	),
	[ENV.STAGING]: createConfiguration(
		"4a21c5bf-309e-4bc0-a398-794e32ee05ab",
		"zulw",
		"xIAMASPAC1"
	),
	[ENV.PROD]: createConfiguration(
		"3c90e211-b001-4785-9b91-13834904da86",
		"zulw",
		"xIAMASPACProd"
	),
};

const azureConfigurationNZ: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: createConfiguration(
		"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
		"local_bkpc",
		"xIAMASPAC0"
	),
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"472a8d5c-fdd2-4248-96d8-2adfcbd2ba40",
		"bkpc",
		"xIAMASPAC0"
	),
	[ENV.STAGING]: createConfiguration(
		"08aa65b3-87c7-40d5-b3cc-b7b811392501",
		"bkpc",
		"xIAMASPAC1"
	),
	[ENV.PROD]: createConfiguration(
		"fb02cbfd-f865-4bd8-9c02-66fc3ec1f8fd",
		"bkpc",
		"xIAMASPACProd"
	),
};

const azureConfigurationTW: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: createConfiguration(
		"41a0a12e-0edd-43cf-b77a-79710d5a1ae3",
		"local_ngyu",
		"xIAMASPAC0",
		{ ui_locales: "zh-tw" }
	),
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"c9f1a4a7-4034-466d-95b1-f15fa90797a5",
		"ngyu",
		"xIAMASPAC0",
		{ ui_locales: "zh-tw" }
	),
	[ENV.STAGING]: createConfiguration(
		"491ce02e-761f-4f97-b980-e0afef47fb23",
		"ngyu",
		"xIAMASPAC1",
		{ ui_locales: "zh-tw" }
	),
	[ENV.PROD]: createConfiguration(
		"5b092536-cdd3-4f54-ba29-af3587266813",
		"ngyu",
		"xIAMASPACProd",
		{ ui_locales: "zh-tw" }
	),
};

const azureConfigurationAU: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: { ...LOCAL_CONFIGURATION },
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: createConfiguration(
		"7433bc91-dca1-462a-ac1a-4106c8ace13d",
		"scdf",
		"xIAMASPAC0"
	),
	[ENV.STAGING]: createConfiguration(
		"3d5b00cf-5963-4f0b-bc40-20563be0627a",
		"scdf",
		"xIAMASPAC1"
	),
	[ENV.PROD]: createConfiguration(
		"77d489b0-3907-43f6-b391-4a41c131f7a1",
		"scdf",
		"xIAMASPACProd"
	),
};

const azureConfigurationIN: Record<ENV, AzureConfiguration> = {
	[ENV.LOCAL]: { ...LOCAL_CONFIGURATION },
	[ENV.PREDEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.DEV]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.STAGING]: { ...DEFAULT_DUMMY_CONFIGURATION },
	[ENV.PROD]: { ...DEFAULT_DUMMY_CONFIGURATION },
};

const getConfig = (): AzureConfiguration | undefined => {
	const instanceEnv = getCurrentInstanceEnv();
	if (instanceEnv) {
		const { instance, env } = instanceEnv;
		const configByInstance: Record<Instance, AzureConfiguration> = {
			[Instance.TH]: azureConfigurationTH[env],
			[Instance.AU]: azureConfigurationAU[env],
			[Instance.HK]: azureConfigurationHK[env],
			[Instance.MY]: azureConfigurationMY[env],
			[Instance.SG]: azureConfigurationSG[env],
			[Instance.NZ]: azureConfigurationNZ[env],
			[Instance.TW]: azureConfigurationTW[env],
			[Instance.IN]: azureConfigurationIN[env],
		};
		return configByInstance[instance];
	}
};

const AzureConfigurationService = {
	getConfig,
};

export default AzureConfigurationService;
