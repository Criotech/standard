import { FC, useState } from "react";
import { useEffectOnce } from "react-use";
import Text from "../../components/Text";
import { useEmail } from "../../hooks/useEmail";
import { useQuery } from "../../hooks/useQuery";
import "./index.scss";
import { useCallbackWithLoading } from "../../hooks/useCallbackWithLoading";
import { useAuthentication } from "../../hooks/useAuthentication";
import LinkButton from "../../components/LinkButton";

enum PageState {
	LOADING,
	SUCCESS,
	FAILURE,
}

const EmailConfirmation: FC<{}> = () => {
	const data = useQuery().get("d");
	const { verify } = useEmail();
	const { resetAuth } = useAuthentication();

	const [pageState, setPageState] = useState<PageState>(PageState.LOADING);

	useEffectOnce(() => {
		(async () => {
			try {
				if (data) {
					await verify({ data });
					setPageState(PageState.SUCCESS);
				} else {
					setPageState(PageState.FAILURE);
				}
			} catch {
				setPageState(PageState.FAILURE);
			}
		})();
	});

	const handleClick = useCallbackWithLoading(async () => {
		await resetAuth();
	}, [resetAuth]);

	return (
		<div className="email-confirmation-page">
			{pageState === PageState.SUCCESS && (
				<p>
					<Text textKey="emailConfirmationPage.success" />
				</p>
			)}

			{pageState === PageState.FAILURE && (
				<p>
					<Text textKey="emailConfirmationPage.failure1" />
					<LinkButton type="button" onClick={handleClick}>
						<Text textKey="emailConfirmationPage.failure2" />
					</LinkButton>
					<Text textKey="emailConfirmationPage.failure3" />
				</p>
			)}
		</div>
	);
};

export default EmailConfirmation;
