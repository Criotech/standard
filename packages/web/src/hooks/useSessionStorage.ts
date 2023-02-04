import { useSessionStorage as nativeUseSessionStorage } from "react-use";

const namespace = "myacuvue:";

export type SetValueAction<T> = (value: T) => void;

export function useSessionStorage<T>(
	key: string
): [T | undefined, SetValueAction<T | undefined>];
export function useSessionStorage<T>(
	key: string,
	initialValue: T
): [T, SetValueAction<T | undefined>];
export function useSessionStorage<T>(
	key: string,
	initialValue?: T | undefined
): [T | undefined, SetValueAction<T | undefined>] {
	const [value, setValue] = nativeUseSessionStorage<T | undefined>(
		namespace + key,
		initialValue
	);
	return [value || initialValue, setValue];
}
