import { useLocalStorage as nativeUseLocalStorage } from "react-use";
import { Dispatch, SetStateAction } from "react";

const namespace = "myacuvue:";

type KeyType =
	| "qr-query-params"
	| "email-verification-issued-at"
	| "show-registration-dialog"
	| "device-token"
	| "default-language"
	| "lifestyle-cart"
	| "line-context"
	| "disable-line-authentication";

export type SetValueAction<T> = Dispatch<SetStateAction<T>>;
export type DeleteValueAction = () => void;

export function useStorage<T>(
	key: KeyType
): [T | undefined, SetValueAction<T | undefined>, DeleteValueAction];
export function useStorage<T>(
	key: KeyType,
	initialValue: T
): [T, SetValueAction<T>, DeleteValueAction];
export function useStorage<T>(
	key: KeyType,
	initialValue?: T | undefined
): [T | undefined, SetValueAction<T | undefined>, DeleteValueAction] {
	const [value, setValue, deleteValue] = nativeUseLocalStorage<T>(
		namespace + key,
		initialValue
	);
	return [value || initialValue, setValue, deleteValue];
}
