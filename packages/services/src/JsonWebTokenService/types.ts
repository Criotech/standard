type JsonWebTokenHeader = {
	typ: string;
	alg: string;
};

type JsonWebTokenPayload = {
	exp: number;
	iat: number;
	jti: string;
	[extraKey: string]: unknown;
};

export type JsonWebToken = {
	header: JsonWebTokenHeader;
	payload: JsonWebTokenPayload;
	rawValue: string;
};

interface IDeviceTokenPayload extends JsonWebTokenPayload {
	userType: string;
	region: string;
	phone: string;
}

export interface IDeviceToken extends JsonWebToken {
	payload: IDeviceTokenPayload;
}

interface ISessionTokenPayload extends JsonWebTokenPayload {
	region: string;
	sessionId: string;
	userId: string;
	userType: string;
}

export interface ISessionToken extends JsonWebToken {
	payload: ISessionTokenPayload;
}
