import { FC } from "react";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import magnifyingGlassOnSheet from "../../../images/magnifying-glass-on-sheet.svg";
import { useHistory } from "react-router-dom";
import "./index.scss";

const GuestView: FC<{}> = () => {
	const history = useHistory();

	return (
		<div className="guest-view">
			<div className="image-wrapper">
				<img
					className="magnifying-glass-on-sheet-image"
					src={magnifyingGlassOnSheet}
					alt="Magnifying Glass"
				/>
			</div>
			<div className="guest-view-description">
				<Text textKey="memberIdPage.guestViewDescription" />
			</div>
			<div className="guest-view-button-wrapper">
				<Button onClick={() => history.push("/registration")}>
					<Text textKey="memberIdPage.registerBlock.registerNowButton" />
				</Button>
			</div>
		</div>
	);
};

export default GuestView;
