import { useXiam } from "../../contexts/XiamContext";
import { FC } from "react";
import { useSession } from "../../hooks/useSession";
import { useEffectOnce } from "react-use";
import { useCallbackWithLoading } from "../../hooks/useCallbackWithLoading";

const SignIn: FC<{}> = () => {
	const { loginRedirect, getXiamToken } = useXiam();
	const { startSession } = useSession();

	const signIn = useCallbackWithLoading(async () => {
		const xiamToken = await getXiamToken();
		if (xiamToken) {
			await startSession();
		} else {
			await loginRedirect();
		}
	}, [getXiamToken, loginRedirect, startSession]);

	useEffectOnce(() => {
		(async () => {
			await signIn();
		})();
	});
	return <></>;
};

export default SignIn;
