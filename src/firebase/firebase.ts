import { initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;
console.log(serviceAccount);
console.log(import.meta.path);
initializeApp({
  credential: applicationDefault(),
  storageBucket: "gs://my-project-1607862575109.appspot.com",
});

export const bucket = getStorage();
