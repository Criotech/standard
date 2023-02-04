import { FC, PropsWithChildren } from "react";
import { ILineContext, LineAuthStatus, LineContext } from "./LineContext";
import { useStorage } from "../hooks/useStorage";

const LineProviderFake: FC<PropsWithChildren<{}>> = ({ children }) => {
	const defaultContextValue: ILineContext = {
		status: LineAuthStatus.AUTHENTICATED,
		lineProfile: {
			lineId: "fake-id",
			displayName: "Somchai Line",
			isFriend: false,
			statusMessage: "Meow",
		},
	};
	const [lineContextFromStorage] = useStorage<ILineContext>(
		"line-context",
		defaultContextValue
	);

	return (
		<LineContext.Provider value={lineContextFromStorage}>
			{children}
		</LineContext.Provider>
	);
};

export default LineProviderFake;
