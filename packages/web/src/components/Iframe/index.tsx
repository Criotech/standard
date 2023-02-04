import { FC } from "react";
import "./index.scss";

export interface IProps {
	url: string;
}

const Iframe: FC<IProps> = ({ url }) => (
	<iframe title="MyAcuvue" src={url} className="iframe" allowFullScreen />
);

export default Iframe;
