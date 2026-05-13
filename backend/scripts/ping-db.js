import "dotenv/config";
import { connectToDatabase, getDatabase } from "../lib/mongodb.js";

async function pingDatabase() {
  const client = await connectToDatabase();
  const db = await getDatabase();
  const result = await db.command({ ping: 1 });

  console.log("MongoDB connected successfully");
  console.log(`Database: ${db.databaseName}`);
  console.log(`Ping: ${result.ok}`);

  await client.close();
}

pingDatabase().catch((error) => {
  console.error("MongoDB connection failed");
  console.error(error.message);
  process.exit(1);
});
