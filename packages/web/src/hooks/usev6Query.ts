import { useLocation } from "react-router-dom-v5-compat";

export function useQuery() {
	const location = useLocation();
	const search = location.search;
	return new URLSearchParams(search);
}
