import { useContext } from "react";
import { ConfigurationContext } from "../contexts/ConfigurationContext";

export const useConfiguration = () => useContext(ConfigurationContext);
