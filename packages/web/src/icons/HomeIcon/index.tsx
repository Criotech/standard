import Icon from "@ant-design/icons";
import { FC } from "react";
import "./index.scss";

const HomeSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3.5 24 24" {...props}>
		<path d="M13.327,4.048,5.1,10.22A2.761,2.761,0,0,0,4,12.415V24.759A2.751,2.751,0,0,0,6.743,27.5H12.23V17.9h5.487v9.6H23.2a2.751,2.751,0,0,0,2.743-2.743V12.415a2.761,2.761,0,0,0-1.1-2.195l-8.23-6.172A2.757,2.757,0,0,0,13.327,4.048Z" />
	</svg>
);

export type Props = {
	color?: string;
};

const HomeIcon: FC<Props> = ({ color }: Props) => (
	<Icon className="home-icon" component={HomeSvg} style={{ color }} />
);

export default HomeIcon;
