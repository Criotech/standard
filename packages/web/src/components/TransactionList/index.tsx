import { FC, useMemo, Fragment } from "react";
import { ITransaction } from "@myacuvue_thailand_web/services";
import TransactionCell from "./TransactionCell";
import { Divider } from "antd";
import Text from "../Text";
import "./index.scss";
import { useTransaction } from "../../hooks/useTransaction";
import { Link } from "react-router-dom-v5-compat";
import { useAsync } from "react-use";
import LoadingBlock from "../LoadingBlock";

interface IProps {
	maximumNumberOfTransactions?: number;
	displayViewAllTransaction?: boolean;
}

const TransactionList: FC<IProps> = ({
	maximumNumberOfTransactions,
	displayViewAllTransaction,
}) => {
	const { getTransactions } = useTransaction();
	const { value, loading } = useAsync(
		() => getTransactions(),
		[getTransactions]
	);
	const retrievedTransactions = value as ITransaction[];

	const transactions = useMemo<ITransaction[]>(() => {
		if (retrievedTransactions && maximumNumberOfTransactions) {
			return retrievedTransactions.slice(0, maximumNumberOfTransactions);
		}
		return retrievedTransactions;
	}, [retrievedTransactions, maximumNumberOfTransactions]);

	return (
		<div className="transaction-list">
			{loading ? (
				<LoadingBlock />
			) : transactions.length > 0 ? (
				<>
					{transactions.map((transaction) => (
						<Fragment key={transaction.id}>
							<TransactionCell transaction={transaction} />
							<Divider plain />
						</Fragment>
					))}
					{displayViewAllTransaction && (
						<Link
							to="/points/transactions"
							className="view-all-transactions"
						>
							<Text textKey="pointsPage.transactionList.viewAllTransactions" />
						</Link>
					)}
				</>
			) : (
				<p className="no-transactions">
					<Text textKey="pointsPage.transactionList.noTransactions" />
				</p>
			)}
		</div>
	);
};

export default TransactionList;
