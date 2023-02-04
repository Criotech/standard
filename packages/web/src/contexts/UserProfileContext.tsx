import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useCallback,
} from "react";
import {
	IGetProfileResponse,
	IProfile,
	Nullable,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useBoolean } from "react-use";
import { useSessionToken } from "./SessionTokenContext";
import { useService } from "../hooks/useService";

export interface IUserProfileContext {
	userProfile?: IGetProfileResponse;
	profileCompleteness?: ProfileCompleteness;
	isLoading: boolean;
	refreshUserProfile: () => Promise<void>;
	wasEmptyBefore: boolean;
	setEmptyBefore: Dispatch<SetStateAction<boolean>>;
}

export const UserProfileContext = createContext<IUserProfileContext>(
	undefined as any
);

export const UserProfileProvider: FC<PropsWithChildren<{}>> = ({
	children,
}) => {
	const { sessionToken } = useSessionToken();
	const { UserService } = useService();

	const [profileCompleteness, setProfileCompleteness] =
		useState<ProfileCompleteness>();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [userProfile, setUserProfile] = useState<Nullable<IProfile>>();

	const [wasEmptyBefore, setEmptyBefore] = useBoolean(false);

	const { getProfile } = useUser();

	const getUserProfile = useCallback(async () => {
		setLoading(true);

		try {
			const profile = await getProfile();
			setUserProfile(profile);
			if (profile) {
				const completeness =
					UserService.getProfileCompleteness(profile);
				setProfileCompleteness(completeness);
			}
		} finally {
			setLoading(false);
		}
	}, [UserService, getProfile]);

	useEffect(() => {
		if (sessionToken) {
			getUserProfile();
		}
	}, [sessionToken, getUserProfile]);

	return (
		<UserProfileContext.Provider
			value={{
				userProfile,
				isLoading,
				profileCompleteness,
				refreshUserProfile: getUserProfile,
				wasEmptyBefore,
				setEmptyBefore,
			}}
		>
			{children}
		</UserProfileContext.Provider>
	);
};

export const useUserProfile = () => {
	return useContext(UserProfileContext);
};
