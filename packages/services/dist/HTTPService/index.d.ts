export declare const post: <T, J extends {} = {}>(url: string, payload?: J | undefined, token?: string) => Promise<{
    data: T;
    headers: any;
    status: number;
}>;
export declare const get: <T>(url: string, token?: string) => Promise<{
    data: T;
    headers: any;
    status: number;
}>;
export declare const patch: <T, J extends {} = {}>(url: string, payload?: J | undefined, token?: string) => Promise<{
    data: T;
    headers: any;
    status: number;
}>;
