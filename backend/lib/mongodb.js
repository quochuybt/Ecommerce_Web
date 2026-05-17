import { MongoClient } from "mongodb";

let cachedClient = null;

function resolveDatabaseName() {
  if (process.env.MONGODB_DB_NAME) return process.env.MONGODB_DB_NAME;

  try {
    const databaseName = new URL(process.env.MONGODB_URI).pathname.replace("/", "");
    return databaseName || "ecommerce";
  } catch {
    return "ecommerce";
  }
}

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(resolveDatabaseName());
}

export async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}
