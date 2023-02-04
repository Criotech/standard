import { FC, useMemo } from "react";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useService } from "../../../hooks/useService";
import "./index.scss";
import Text from "../../../components/Text";
import { useDate } from "../../../hooks/useDate";

interface IProps {
	firstName: string;
	lastName: string;
	email: string;
	birthMonth?: string;
	birthYear?: string;
	gender: string;
	className?: string;
}

const MyProfileBlock: FC<IProps> = ({
	firstName,
	lastName,
	email,
	birthMonth,
	birthYear,
	gender,
	className,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-profile",
		className
	);

	const { shortDateToDisplay, getDateFromString } = useDate();

	const birthDate = useMemo(() => {
		if (birthYear && birthMonth) {
			const yearMonthString = `${birthYear}-${birthMonth}`;
			const date = getDateFromString(yearMonthString);
			return shortDateToDisplay(date);
		} else {
			return "";
		}
	}, [birthMonth, birthYear, getDateFromString, shortDateToDisplay]);

	return (
		<div className={classNames}>
			<BlockTitle textKey={"profilePage.myProfileBlock.myProfile"} />
			<table className="profile-table">
				<tbody>
					<tr>
						<td>
							<Text
								textKey={"profilePage.myProfileBlock.firstName"}
							/>
							:
						</td>
						<td>{firstName}</td>
					</tr>
					<tr>
						<td>
							<Text
								textKey={"profilePage.myProfileBlock.lastName"}
							/>
							:
						</td>
						<td>{lastName}</td>
					</tr>
					<tr>
						<td>
							<Text
								textKey={"profilePage.myProfileBlock.email"}
							/>
							:
						</td>
						<td>{email}</td>
					</tr>
					<tr>
						<td>
							<Text
								textKey={
									"profilePage.myProfileBlock.dateOfBirth"
								}
							/>
							:
						</td>
						<td>{birthDate}</td>
					</tr>
					<tr>
						<td>
							<Text
								textKey={"profilePage.myProfileBlock.gender"}
							/>
							:
						</td>
						<td>{gender}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default MyProfileBlock;
