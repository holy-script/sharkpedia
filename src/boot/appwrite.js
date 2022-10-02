import { boot } from "quasar/wrappers";
import { Client, Storage, ID, Databases, Account } from "appwrite";

const client = new Client();
const endpoint = process.env.API_ENDPOINT;
const project = process.env.PROJECT_ID;
const database = process.env.DATABASE_ID;
const collection = process.env.COLLECTION_ID;
const bucket = process.env.BUCKET_ID;

client.setEndpoint(endpoint).setProject(project);

const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);

const createFile = async (file) => {
	try {
		const res = await storage.createFile(bucket, ID.unique(), file);
		return res;
	} catch (err) {
		console.log(err.message);
		return err.message;
	}
};

const createDocument = async (content) => {
	try {
		const res = await databases.createDocument(
			database,
			collection,
			ID.unique(),
			content
		);
		return res;
	} catch (err) {
		console.log(err.message);
		return err.message;
	}
};

const listDocuments = async () => {
	try {
		const res = await databases.listDocuments(database, collection);
		return res;
	} catch (err) {
		console.log(err.message);
	}
};

const getFile = (id) => {
	try {
		const res = storage.getFilePreview(bucket, id);
		return res;
	} catch (err) {
		console.log(err.message);
	}
};

const getUser = async () => {
	try {
		const res = await account.get();
		return res;
	} catch (err) {
		console.log(err.message);
		return null;
	}
};

const createSession = async (email, pwd) => {
	try {
		const res = await account.createEmailSession(email, pwd);
		return res;
	} catch (err) {
		console.log(err.message);
		return err.message;
	}
};

export {
	createFile,
	createDocument,
	listDocuments,
	getFile,
	getUser,
	createSession,
};
