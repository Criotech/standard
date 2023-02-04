import { FC, ReactNode } from "react";
import Text from "../../components/Text";
import "./index.scss";
import Barcode from "../Barcode";

export interface IProps {
	name: string;
	memberId: string;
	picture: ReactNode;
	badge?: ReactNode;
}

const MemberCard: FC<IProps> = ({ name, picture, memberId, badge }) => {
	const fullName = name.split(" ");
	return (
		<div className="member-card">
			<div className="member-id-card">
				<div className="member-details">
					<div className="picture-and-name-container">
						<div className="member-image">{picture} </div>
						<div className="member-name-and-id">
							<h1>
								{fullName[0]} {fullName[1]}
							</h1>
							<h2>{memberId}</h2>
						</div>
					</div>
					{badge && <div className="badge-image">{badge}</div>}
				</div>
			</div>
			<div className="scan-code">
				<p className="scan-description">
					<Text textKey="memberIdPage.scanDescription" />
				</p>
				<p className="scan-description" />
				<Barcode value={memberId} />
				<p className="member-id-value">{memberId}</p>
			</div>
		</div>
	);
};

export default MemberCard;
