import { getRequiredEnv } from "../utils/env";

const appEnv = getRequiredEnv("APP_ENV") as "development" | "production" | "staging";

export const config = {
    isDevelopment: appEnv === "development",
    isProduction: appEnv === "production",
    isStaging: appEnv === "staging",
};
