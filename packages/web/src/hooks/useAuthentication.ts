import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuthentication() {
	return useContext(AuthContext);
}
