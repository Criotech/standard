import { FC, useEffect, useState } from "react";
import { Alert, Button } from "antd";
import Text from "../Text";
import { useService } from "../../hooks/useService";
import { TranslationType } from "@myacuvue_thailand_web/services";

export const UpdatePrompt: FC<{}> = () => {
	const { WindowService, SWService } = useService();

	const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
		null
	);

	useEffect(() => {
		SWService.register({
			onUpdate: ({ waiting }: ServiceWorkerRegistration) =>
				setWaitingWorker(waiting),
			onActive: ({ waiting }: ServiceWorkerRegistration) =>
				setWaitingWorker(waiting),
			PUBLIC_URL: process.env.PUBLIC_URL,
			NODE_ENV: process.env.NODE_ENV,
		});
	}, [SWService]);

	useEffect(() => {
		waitingWorker?.addEventListener("statechange", () => {
			if (waitingWorker.state === "activated") {
				WindowService.reload();
			}
		});
	}, [WindowService, waitingWorker]);

	return waitingWorker ? (
		<Alert
			message={
				<Text
					textKey="updatePrompt.newVersion"
					type={TranslationType.updatePrompt}
				/>
			}
			type="warning"
			showIcon
			action={
				<Button
					size="small"
					type="text"
					onClick={() => {
						waitingWorker?.postMessage({
							type: "SKIP_WAITING",
						});
					}}
				>
					<Text
						textKey="updatePrompt.reload"
						type={TranslationType.updatePrompt}
					/>
				</Button>
			}
		/>
	) : (
		<></>
	);
};
