export interface ILoggerConfig {
  LEVEL?: string;
  SENSITIVE_DATA?: string;
  PRETTY?: string;
}

export interface IDatabasePoolConfig {
  MIN: number;
  MAX: number;
  ACQUIRE_TIMEOUT: number;
}

export interface IDatabaseConfig {
  HOST: string;
  NAME: string;
  SCHEMA: string;
  USERNAME: string;
  PASS: string;
  PORT: number;
  DEBUG: string;
  UPDATE_SCHEMA: string;
  POOL: IDatabasePoolConfig;
}

export interface IAppConfig {
  PORT: number;
  DB: IDatabaseConfig;
  LOG?: ILoggerConfig;
}
