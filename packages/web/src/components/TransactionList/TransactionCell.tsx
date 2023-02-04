import { FC } from "react";
import { ITransaction } from "@myacuvue_thailand_web/services";
import "./TransactionCell.scss";
import Text from "../Text";
import moment from "moment";

interface IProps {
	transaction: ITransaction;
}

const TransactionCell: FC<IProps> = ({ transaction }) => {
	const isPositiveNumber = transaction.pointsOscillation >= 0;

	const formattedTransactiondDate = moment(
		new Date(transaction.timestamp)
	).format("DD/MM/YYYY hh:mm");

	return (
		<div className="transaction-cell">
			<div className="transaction-details">
				<div className="transaction-header">
					<h2>
						{isPositiveNumber ? (
							<Text textKey="pointsPage.transactionCell.earned" />
						) : (
							<Text textKey="pointsPage.transactionCell.redeemed" />
						)}
					</h2>

					<div className="transaction-points">
						{isPositiveNumber ? (
							<h2 className="earned-points">
								{`+${transaction.pointsOscillation}`}
							</h2>
						) : (
							<h2 className="redeemed-points">
								{`${transaction.pointsOscillation}`}
							</h2>
						)}
					</div>
				</div>

				<p className="transaction-time">{formattedTransactiondDate}</p>

				<div className="transaction-description">
					{transaction.description.map((productDescription) => (
						<p
							className="transaction-product-description"
							key={productDescription}
						>
							{productDescription}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default TransactionCell;
