import { DependencyList, useCallback } from "react";
import { useLoading } from "./useLoading";

export function useCallbackWithLoading<
	T extends (...args: any[]) => Promise<any>
>(callback: T, deps: DependencyList): T {
	const { showLoading, hideLoading } = useLoading();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(
		(async (...args: any[]) => {
			try {
				showLoading();
				return await callback(...args);
			} finally {
				hideLoading();
			}
		}) as T,
		[showLoading, hideLoading, ...deps]
	);
}
