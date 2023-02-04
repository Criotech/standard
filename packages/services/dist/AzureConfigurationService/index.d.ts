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
declare const AzureConfigurationService: {
    getConfig: () => AzureConfiguration | undefined;
};
export default AzureConfigurationService;
