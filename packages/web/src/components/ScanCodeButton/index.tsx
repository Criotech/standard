import { FC } from "react";
import { Link } from "react-router-dom-v5-compat";
import ScanCodeIcon from "../../icons/ScanCodeIcon";

const ScanCodeButton: FC<{}> = () => (
	<Link to="/member-id" className="cart-button">
		<ScanCodeIcon color="#003087" />
	</Link>
);

export default ScanCodeButton;
