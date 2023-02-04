import { FC } from "react";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import "./index.scss";

const ResetPasswordSuccess: FC<{}> = () => {
	const history = useHistory();

	return (
		<div className="acuvue-reset-password-success-page">
			<div className="content">
				<h1>
					<Text textKey={"resetPasswordSuccess.heading"} />
				</h1>

				<p>
					<Text textKey="resetPasswordSuccess.body" />
				</p>

				<Button
					className="ok-button"
					onClick={() => history.push("/sign-in")}
				>
					<Text textKey="resetPasswordSuccess.buttonText" />
				</Button>
			</div>
		</div>
	);
};

export default ResetPasswordSuccess;
