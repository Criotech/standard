import { FC } from "react";
import { useWideScreen } from "../../../../hooks/useWideScreen";
import RegisterStoreWideView from "./RegisterStoreWideView";
import RegisterStoreViewSmall from "./RegisterStoreViewSmall";

const RegisterStoreView: FC<{}> = () => {
	const { isWideScreen } = useWideScreen();

	return isWideScreen ? (
		<RegisterStoreWideView />
	) : (
		<RegisterStoreViewSmall />
	);
};

export default RegisterStoreView;
