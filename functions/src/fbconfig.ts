import * as admin from "firebase-admin/app";
import * as firestore from "firebase-admin/firestore";

admin.initializeApp({
  credential: admin.applicationDefault(),
});
const db = firestore.getFirestore();

export {admin, db};
