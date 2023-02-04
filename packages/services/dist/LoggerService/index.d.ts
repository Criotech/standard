export declare enum LogType {
    debug = 10,
    info = 20,
    warning = 30,
    error = 40
}
declare function debug(...data: any[]): void;
declare function info(...data: any[]): void;
declare function warning(...data: any[]): void;
declare function error(...data: any[]): void;
declare const _default: {
    debug: typeof debug;
    info: typeof info;
    warning: typeof warning;
    error: typeof error;
};
export default _default;
