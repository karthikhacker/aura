import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.home.aura',
    projectId: '667c19310035d33832f6',
    databaseId: '667c1c0a0014bd7ea360',
    userCollectionId: '667c1c99001922cf0ca8',
    videoCollectionId: '667c1cf8001aca235c7b',
    storageId: '667c2075003ba27bb82c'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;
const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log(session);
        return session;
    } catch (error) {
        throw new Error(error);
        console.log(error)
    }
}
export const registerUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password)
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                password: password,
                username: username,
                avatar: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        throw new Error(error);
        console.log(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const listPosts = async () => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const listLatestPosts = async () => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const searchPosts = async (query) => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const getUserPosts = async (userId) => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error)
    }
}