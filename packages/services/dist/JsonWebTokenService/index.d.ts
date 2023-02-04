import { JsonWebToken } from "./types";
declare const JsonWebTokenService: {
    parse: <ReturnType_1 extends JsonWebToken>(stringToken: string) => ReturnType_1;
    getRemainingTimeInSeconds: (token: JsonWebToken) => number;
    isExpired: (token: JsonWebToken) => boolean;
    getTotalDurationInSeconds: (token: JsonWebToken) => number;
    getElapsedTimeInPercent: (token: JsonWebToken) => number;
};
export default JsonWebTokenService;
