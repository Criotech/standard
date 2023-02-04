import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useState,
} from "react";
import { Spin } from "antd";

export interface ILoadingContext {
	showLoading: () => void;
	hideLoading: () => void;
	isLoading: boolean;
}

export const LoadingContext = createContext<ILoadingContext>(undefined as any);

export const LoadingProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [counter, setCounter] = useState<number>(0);

	const showLoading = useCallback(() => {
		setCounter((state) => state + 1);
	}, [setCounter]);

	const hideLoading = useCallback(() => {
		setCounter((state) => state - 1);
	}, [setCounter]);

	const isLoading = counter > 0;

	return (
		<LoadingContext.Provider
			value={{
				showLoading,
				hideLoading,
				isLoading,
			}}
		>
			<Spin
				size="large"
				delay={100}
				wrapperClassName="loading-box"
				spinning={isLoading}
			>
				{children}
			</Spin>
		</LoadingContext.Provider>
	);
};
