import WindowService from "../WindowService";
export var LogType;
(function (LogType) {
    LogType[LogType["debug"] = 10] = "debug";
    LogType[LogType["info"] = 20] = "info";
    LogType[LogType["warning"] = 30] = "warning";
    LogType[LogType["error"] = 40] = "error";
})(LogType || (LogType = {}));
const logLevel = WindowService.getItemFromLocalStorage("logLevel") ||
    LogType.warning;
const logFunctions = {
    [LogType.debug]: WindowService.console.debug,
    [LogType.info]: WindowService.console.info,
    [LogType.warning]: WindowService.console.warn,
    [LogType.error]: WindowService.console.error,
};
function log(type, ...data) {
    if (type >= logLevel) {
        logFunctions[type](...data);
    }
}
function debug(...data) {
    log(LogType.debug, ...data);
}
function info(...data) {
    log(LogType.info, ...data);
}
function warning(...data) {
    log(LogType.warning, ...data);
}
function error(...data) {
    log(LogType.error, ...data);
}
export default {
    debug,
    info,
    warning,
    error,
};
