import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { useService } from "../hooks/useService";
import { ILineProfile } from "@myacuvue_thailand_web/services";
import { useAsync } from "react-use";
import { useConfiguration } from "../hooks/useConfiguration";

export enum LineAuthStatus {
	LOADING,
	AUTHENTICATED,
}

export interface ILineContext {
	status: LineAuthStatus;
	lineProfile?: ILineProfile;
}

export const LineContext = createContext<ILineContext>(undefined as any);

export const LineProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { LineService } = useService();
	const { lineConfig } = useConfiguration();

	const [status, setStatus] = useState<LineAuthStatus>(
		LineAuthStatus.LOADING
	);

	const { value: lineProfile, loading } = useAsync(
		async () => lineConfig && LineService.getProfile(lineConfig.liffId),
		[LineService.getProfile, lineConfig]
	);

	useEffect(() => {
		if (lineProfile && !loading) {
			setStatus(LineAuthStatus.AUTHENTICATED);
		}
	}, [lineProfile, loading]);

	return lineProfile ? (
		<LineContext.Provider
			value={{
				status,
				lineProfile,
			}}
		>
			{status === LineAuthStatus.AUTHENTICATED && children}
		</LineContext.Provider>
	) : (
		<>{children}</>
	);
};

export const useLine = () => {
	return useContext(LineContext);
};
