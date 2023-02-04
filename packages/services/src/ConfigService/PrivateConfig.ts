import { ENV, Environment } from "./types";
import { Config } from "./index";

// Configurations to be used only inside Services Package.
export type PrivateConfig = Config & {
	environment: ENV;
	APIEnvironment: Environment;
};
