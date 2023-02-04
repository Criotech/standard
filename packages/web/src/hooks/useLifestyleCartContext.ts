import { useContext } from "react";
import {
	ILifestyleCartContext,
	LifestyleCartContext,
} from "../contexts/LifestyleCartContext";

export function useLifestyleCartContext(): ILifestyleCartContext {
	return useContext(LifestyleCartContext);
}
