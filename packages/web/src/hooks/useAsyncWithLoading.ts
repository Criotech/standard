import { DependencyList } from "react";
import { useLoading } from "./useLoading";
import { useAsync } from "react-use";

export declare type PromiseType<P extends Promise<any>> = P extends Promise<
	infer T
>
	? T
	: never;

export declare type AsyncState<T> =
	| {
			loading: boolean;
			error?: undefined;
			value?: undefined;
	  }
	| {
			loading: true;
			error?: Error | undefined;
			value?: T;
	  }
	| {
			loading: false;
			error: Error;
			value?: undefined;
	  }
	| {
			loading: false;
			error?: undefined;
			value: T;
	  };

export function useAsyncWithLoading<T extends (...args: any[]) => Promise<any>>(
	callback: T,
	deps?: DependencyList
): AsyncState<PromiseType<ReturnType<T>>> {
	const { showLoading, hideLoading } = useLoading();
	return useAsync(async () => {
		try {
			showLoading();
			return await callback();
		} finally {
			hideLoading();
		}
	}, [showLoading, hideLoading, ...(deps || [])]);
}
