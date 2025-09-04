import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  // optional: test DB connection
  try {
    await prisma.$connect();
    console.log("Prisma connected");
  } catch (e) {
    console.error("Prisma connection error", e);
  }
});
