const parse = (stringToken) => {
    const [headerString, payloadString, _signatureString] = stringToken.split(".");
    const jsonWebToken = {
        header: JSON.parse(atob(headerString)),
        payload: JSON.parse(atob(payloadString)),
        rawValue: stringToken,
    };
    return jsonWebToken;
};
const getRemainingTimeInSeconds = (token) => {
    const SECOND_IN_MILISECONDS = 1000;
    const nowInMs = Date.now();
    const nowInSeconds = nowInMs / SECOND_IN_MILISECONDS;
    return token.payload.exp - Math.floor(nowInSeconds);
};
const isExpired = (token) => {
    return getRemainingTimeInSeconds(token) <= 0;
};
const getTotalDurationInSeconds = (token) => {
    const expiresAt = token.payload.exp;
    const issuedAt = token.payload.iat;
    return expiresAt - issuedAt;
};
const getElapsedTimeInPercent = (token) => {
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
