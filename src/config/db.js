import { PrismaClient } from "./../../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["error", "warn", "query"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error While Connecting to DB : ", error);
    process.exit(1);
  }
};
const disconnect = async () => {
  await prisma.$disconnect();
};
export { prisma, connectDB, disconnect };
