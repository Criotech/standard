import WindowService from "../WindowService";

export enum LogType {
	debug = 10,
	info = 20,
	warning = 30,
	error = 40,
}

const logLevel: LogType =
	WindowService.getItemFromLocalStorage<LogType>("logLevel") ||
	LogType.warning;

const logFunctions: Record<LogType, Function> = {
	[LogType.debug]: WindowService.console.debug,
	[LogType.info]: WindowService.console.info,
	[LogType.warning]: WindowService.console.warn,
	[LogType.error]: WindowService.console.error,
};

function log(type: LogType, ...data: any[]) {
	if (type >= logLevel) {
		logFunctions[type](...data);
	}
}
function debug(...data: any[]) {
	log(LogType.debug, ...data);
}
function info(...data: any[]) {
	log(LogType.info, ...data);
}
function warning(...data: any[]) {
	log(LogType.warning, ...data);
}
function error(...data: any[]) {
	log(LogType.error, ...data);
}
export default {
	debug,
	info,
	warning,
	error,
};
