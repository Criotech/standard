import { ENV, Environment } from "./types";
import { Config } from "./index";
export declare type PrivateConfig = Config & {
    environment: ENV;
    APIEnvironment: Environment;
};
