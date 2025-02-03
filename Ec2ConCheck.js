import { MongoClient } from "mongodb";

const uri = "mongodb://user:123456@52.91.58.245:27017/dept"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function checkConnection() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    } finally {
        await client.close();
    }
}

checkConnection();
