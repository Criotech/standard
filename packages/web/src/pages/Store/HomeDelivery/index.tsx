import { FC } from "react";
import AcuvueToHome from "../../../images/Acuvue-to-home.png";
import "./index.scss";

const HomeDelivery: FC = () => {
	return (
		<div className="home-delivery">
			<a href="https://www.acuvue.co.th/ACUVUEtoHome">
				<img
					className="home-delivery-img"
					src={AcuvueToHome}
					alt="Home delivery"
				/>
			</a>
		</div>
	);
};

export default HomeDelivery;
