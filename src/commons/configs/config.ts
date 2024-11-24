import { IAppConfig } from "../../models/interfaces/app-config.interface";

export const config: IAppConfig = {
  PORT: parseInt(process.env.PORT ?? "0", 10),
  LOG: {
    LEVEL: process.env.LOG_LEVEL,
    SENSITIVE_DATA: process.env.LOG_SENSITIVE_DATA,
    PRETTY: process.env.LOG_PRETTY,
  },
  DB: {
    HOST: process.env.DB_HOST ?? "",
    NAME: process.env.DB_NAME ?? "",
    SCHEMA: process.env.DB_SCHEMA ?? "",
    USERNAME: process.env.DB_USER ?? "",
    PASS: process.env.DB_PASS ?? "",
    PORT: parseInt(process.env.DB_PORT ?? "", 10),
    DEBUG: process.env.DB_DEBUG ?? "",
    UPDATE_SCHEMA: process.env.DB_UPDATE_SCHEMA ?? "",
    POOL: {
      MIN: parseInt(process.env.DB_POOL_MIN ?? "", 10),
      MAX: parseInt(process.env.DB_POOL_MAX ?? "", 10),
      ACQUIRE_TIMEOUT: parseInt(process.env.DB_POOL_ACQUIRE_TIMEOUT ?? "", 10),
    },
  },
};

export function validateConfig(config: IAppConfig): void {
  function validateObject(obj: Record<string, unknown>, parentKey: string = "", ...excludedKeys: string[]): void {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (excludedKeys.includes(fullKey)) {
          continue;
        }

        if (typeof value === "string" && value.trim() === "") {
          throw new Error(`Application initialization failed due to missing or empty configuration: ${fullKey}`);
        }

        if (typeof value === "number" && value === 0) {
          throw new Error(`Application initialization failed due to missing or empty configuration: ${fullKey}`);
        }

        if (typeof value === "object" && value !== null) {
          validateObject(value as Record<string, unknown>, fullKey, ...excludedKeys);
        }
      }
    }
  }

  validateObject(config as unknown as Record<string, unknown>, "", "LOG");
}
