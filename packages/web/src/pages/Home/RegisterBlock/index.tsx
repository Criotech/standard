import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import "./index.scss";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import Text from "../../../components/Text";

const RegisterBlock: FC<{}> = () => {
	const navigate = useNavigate();

	const onRegisterNow = useCallback(() => {
		navigate("/registration");
	}, [navigate]);

	return (
		<div className="register-block">
			<h2>
				<Text textKey="drawer.becomeMember" />
			</h2>
			<p>
				<Text textKey="homePage.registerBlock.joinUsNow" />
			</p>
			<Button
				className="register-now-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				onClick={onRegisterNow}
			>
				<Text textKey="homePage.registerBlock.button.registerNowLabel" />
			</Button>
		</div>
	);
};

export default RegisterBlock;
