export {};

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      token: string;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DATABASE_URL: string;
      PORT: number;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      SALT_ROUNDS: string;
    }
  }
}
