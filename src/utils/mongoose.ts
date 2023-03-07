import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connection.on("connecting", () => {
  console.info("connecting to MongoDb");
});

mongoose.connection.on("error", (error) => {
  console.error("error in MongoDb connection", error);
});

mongoose.connection.on("connected", () => {
  console.info("MongoDB connected");
});

mongoose.connection.once("open", () => {
  console.info("MongoDB connection opened");
});

mongoose.connection.on("reconnected", () => {
  console.info("MongoDB reconnected");
});

mongoose.connection.on("disconnected", () => {
  console.info("MongoDB disconnected");
});

const disconnect = () => {
  return mongoose.disconnect().catch(() => void 0);
};

const connect = () => {
  return mongoose.connect(process.env.MONGO_DATABASE_URL, {});
};

export const connectToMongo = async () => {
  await disconnect();

  await connect()
    .catch(() => connect())
    .catch(() => process.exit(1));
};
