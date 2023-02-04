import { FC } from "react";
import { useWideScreen } from "../../../hooks/useWideScreen";
import SmallHeader from "./SmallHeader";
import WideHeader from "./WideHeader";

const MyAcuvueLiteHeader: FC<{}> = () => {
	const { isWideScreen } = useWideScreen();

	return isWideScreen ? <WideHeader /> : <SmallHeader />;
};

export default MyAcuvueLiteHeader;
