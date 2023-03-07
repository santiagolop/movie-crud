export {};

declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DATABASE_URL: string;
      PORT: number;
      JWT_SECRET: string;
      SALT_ROUNDS: string;
    }
  }
}
