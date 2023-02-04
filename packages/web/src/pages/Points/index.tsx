import { FC } from "react";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import Text from "../../components/Text";
import PointsBlock from "../../components/PointsBlock";
import "./index.scss";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom-v5-compat";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import { usePoints } from "../../hooks/usePoints";
import TransactionList from "../../components/TransactionList";
import { IPoints } from "@myacuvue_thailand_web/services";
import moment from "moment";
import LoadingBlock from "../../components/LoadingBlock";
import { useAsync } from "react-use";
import Header from "../../components/Layout/Header";

const Points: FC<{}> = () => {
	const navigate = useNavigate();
	const { getUserPoints } = usePoints();

	const { value, loading } = useAsync(() => getUserPoints(), [getUserPoints]);
	const points = value as IPoints;

	return (
		<div className="points-page">
			<Header titleKey="pointsPage.title" />
			<main>
				{loading ? (
					<LoadingBlock />
				) : (
					<PointsBlock showPointsTerms points={points} />
				)}

				{!loading && (
					<div className="about-acuvue-buttons">
						<Button
							className="earn-points-button"
							type={ButtonType.OUTLINE}
							size={ButtonSize.SMALL}
							onClick={() => navigate("/points/about")}
						>
							<Text textKey="pointsPage.earnPoints" />
						</Button>
						<Button
							className="member-benefits-button"
							type={ButtonType.OUTLINE}
							size={ButtonSize.SMALL}
							onClick={() => navigate("/membership")}
						>
							<Text textKey="aboutAcuvuePage.memberBenefits" />
						</Button>
					</div>
				)}

				<Divider plain />

				{loading ? (
					<LoadingBlock />
				) : (
					<p className="points-expiring-text">
						{points.expiringPoints && points.expiringAt ? (
							<Text
								textKey="pointsBlock.pointsExpiringOn"
								data={{
									points: points.expiringPoints,
									expiryDate: moment(
										points.expiringAt
									).format("DD/MM/YYYY"),
								}}
							/>
						) : (
							<Text textKey="pointsBlock.noPointExpiring" />
						)}
					</p>
				)}

				{!loading && (
					<Button
						onClick={() => navigate("/rewards/wallet/active")}
						className="browse-reward-button"
						type={ButtonType.PRIMARY}
						size={ButtonSize.MEDIUM}
					>
						<Text textKey="pointsBlock.browseRewards" />
					</Button>
				)}

				<Divider plain />

				<TransactionList
					maximumNumberOfTransactions={5}
					displayViewAllTransaction
				/>

				<GlobalNavigationPanel />
			</main>
		</div>
	);
};

export default Points;
