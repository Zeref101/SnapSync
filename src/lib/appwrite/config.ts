import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,    // env does not exist on type "ImportMeta" => create vite-env.d.ts under lib to let typeScript know that we are using vite and this source is going to exist
    appwriteURL: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  };

export const client = new Client();
        
client.setProject(appwriteConfig.projectId);    // it's used to specify which project on the Appwrite server your application should interact with
client.setEndpoint(appwriteConfig.appwriteURL); // This URL tells the Appwrite client where to send its HTTP requests for various Appwrite services like authentication, databases, and storage.
             

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);