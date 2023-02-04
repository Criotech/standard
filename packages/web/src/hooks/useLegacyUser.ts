import { useAuthentication } from "./useAuthentication";
import { useCallback } from "react";
import { useLoading } from "./useLoading";
import { useService } from "./useService";
import {
	IUser,
	UpdateProfileRequest,
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
} from "@myacuvue_thailand_web/services";

interface IUseLegacyUser {
	user: IUser | undefined;
	updateProfile: (payload: UpdateProfileRequest) => Promise<void>;
	getConsents: () => Promise<ListConsentsResponseBody>;
	saveConsents: (payload: SaveConsentsRequestBody) => Promise<void>;
}

export const useLegacyUser = (): IUseLegacyUser => {
	const { LegacyUserService } = useService();
	const { sessionToken, user } = useAuthentication();
	const { showLoading, hideLoading } = useLoading();

	const updateProfile = useCallback(
		async (payload: UpdateProfileRequest) => {
			showLoading();
			try {
				await LegacyUserService.updateProfile(
					sessionToken?.rawValue!,
					payload
				);
			} finally {
				hideLoading();
			}
		},
		[sessionToken?.rawValue, showLoading, hideLoading, LegacyUserService]
	);

	const getConsents = useCallback(async () => {
		showLoading();
		try {
			return await LegacyUserService.getConsents(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, LegacyUserService]);

	const saveConsents = useCallback(
		async (payload: SaveConsentsRequestBody) => {
			showLoading();
			try {
				await LegacyUserService.saveConsents(
					sessionToken?.rawValue!,
					payload
				);
			} finally {
				hideLoading();
			}
		},
		[LegacyUserService, hideLoading, sessionToken?.rawValue, showLoading]
	);

	return {
		user,
		updateProfile,
		getConsents,
		saveConsents,
	};
};
