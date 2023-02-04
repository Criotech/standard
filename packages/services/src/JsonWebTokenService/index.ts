import { JsonWebToken } from "./types";

const parse = <ReturnType extends JsonWebToken>(
	stringToken: string
): ReturnType => {
	const [headerString, payloadString, _signatureString] =
		stringToken.split(".");

	const jsonWebToken = {
		header: JSON.parse(atob(headerString)),
		payload: JSON.parse(atob(payloadString)),
		rawValue: stringToken,
	};
	return jsonWebToken as ReturnType;
};

const getRemainingTimeInSeconds = (token: JsonWebToken): number => {
	const SECOND_IN_MILISECONDS = 1000;
	const nowInMs = Date.now();
	const nowInSeconds = nowInMs / SECOND_IN_MILISECONDS;
	return token.payload.exp - Math.floor(nowInSeconds);
};

const isExpired = (token: JsonWebToken): boolean => {
	return getRemainingTimeInSeconds(token) <= 0;
};

const getTotalDurationInSeconds = (token: JsonWebToken): number => {
	const expiresAt = token.payload.exp;
	const issuedAt = token.payload.iat;
	return expiresAt - issuedAt;
};

const getElapsedTimeInPercent = (token: JsonWebToken): number => {
	const totalTime = getTotalDurationInSeconds(token);
	const remainingTime = getRemainingTimeInSeconds(token);
	const elapsedTime = totalTime - remainingTime;

	if (totalTime === 0) {
		return 1;
	}

	return elapsedTime / totalTime;
};

const JsonWebTokenService = {
	parse,
	getRemainingTimeInSeconds,
	isExpired,
	getTotalDurationInSeconds,
	getElapsedTimeInPercent,
};

export default JsonWebTokenService;
