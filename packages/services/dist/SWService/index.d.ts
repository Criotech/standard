export declare type SWConfig = {
    onActive?: (registration: ServiceWorkerRegistration) => void;
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
    NODE_ENV: string;
    PUBLIC_URL: string;
};
declare function register(config: SWConfig): void;
declare function unregister(): void;
declare const SWService: {
    register: typeof register;
    unregister: typeof unregister;
};
export default SWService;
