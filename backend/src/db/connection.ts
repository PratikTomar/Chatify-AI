import { connect, disconnect } from "mongoose";

async function connectToDB() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Can not connect to mongodb");
  }
}

async function disconnectfromDB() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not disconnect from MongoDB");
  }
}

export { connectToDB, disconnectfromDB };
