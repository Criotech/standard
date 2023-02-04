import { FC, useEffect } from "react";
import { useService } from "../../hooks/useService";
import { useLocation } from "react-use";

const ScrollToTop: FC<{}> = () => {
	const { WindowService } = useService();
	const { pathname } = useLocation();

	useEffect(() => {
		WindowService.scrollTo(0, 0, "auto");
	}, [WindowService, pathname]);

	return <></>;
};

export default ScrollToTop;
