import {
	IPromocode,
	IGetProfileResponse,
	UpdateProfilePayload,
} from "@myacuvue_thailand_web/services";
import { useCallback } from "react";
import { useSessionToken } from "../contexts/SessionTokenContext";
import { useCallbackWithLoading } from "./useCallbackWithLoading";
import { useLoading } from "./useLoading";
import { useService } from "./useService";

interface IUseUser {
	getProfile: () => Promise<IGetProfileResponse>;
	saveProfile: (payload: UpdateProfilePayload) => Promise<void>;
	getPromocode: () => Promise<IPromocode>;
	updateAuthenticationDone: () => void;
	generatePromocode: () => Promise<IPromocode>;
}

export const useUser = (): IUseUser => {
	const { UserService } = useService();
	const { sessionToken } = useSessionToken();
	const { showLoading, hideLoading } = useLoading();

	const getProfile = useCallback(async () => {
		showLoading();
		try {
			return await UserService.getProfile(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [showLoading, hideLoading, UserService, sessionToken?.rawValue]);

	const saveProfile = useCallback(
		async (payload: UpdateProfilePayload) => {
			showLoading();
			try {
				return await UserService.saveProfile(
					sessionToken?.rawValue!,
					payload
				);
			} finally {
				hideLoading();
			}
		},
		[showLoading, hideLoading, UserService, sessionToken?.rawValue]
	);

	const updateAuthenticationDone = useCallbackWithLoading(async () => {
		return UserService.updateAuthenticationDone(sessionToken?.rawValue!);
	}, [sessionToken?.rawValue]);

	const getPromocode = useCallbackWithLoading(async () => {
		return UserService.getPromocode(sessionToken?.rawValue!);
	}, [UserService, sessionToken?.rawValue]);

	const generatePromocode = useCallbackWithLoading(async () => {
		return await UserService.generatePromocode(sessionToken?.rawValue!);
	}, [sessionToken?.rawValue]);

	return {
		getProfile,
		saveProfile,
		updateAuthenticationDone,
		getPromocode,
		generatePromocode,
	};
};
