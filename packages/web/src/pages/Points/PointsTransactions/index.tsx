import { FC } from "react";
import Text from "../../../components/Text";
import Header from "../../../components/Layout/Header";
import "./index.scss";
import TransactionList from "../../../components/TransactionList";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";

const PointsTransactions: FC<{}> = () => (
	<div className="points-transactions">
		<Header titleKey="pointsPage.transactionList.masthead" />

		<main className="points-transactions-content">
			<div className="points-transactions-header">
				<h1 className="points-transactions-title">
					<Text textKey="pointsPage.pointsTransactions" />
				</h1>
				<div className="transaction-and-points">
					<h2 className="transaction-title">
						<Text textKey="pointsPage.transactionList.transactions" />
					</h2>

					<h2 className="points">
						<Text textKey="pointsPage.transactionList.points" />
					</h2>
				</div>
			</div>

			<div className="transaction-list-and-end-of-transaction">
				<TransactionList />
				<p className="end-of-transaction">
					<Text textKey="pointsPage.pointsTransactions.endOfTransaction" />
				</p>
			</div>
		</main>

		<GlobalNavigationPanel />
	</div>
);

export default PointsTransactions;
