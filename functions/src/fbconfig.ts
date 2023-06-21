import * as admin from "firebase-admin/app";
import * as firestore from "firebase-admin/firestore";
// import * as functions from "firebase-functions";

admin.initializeApp({
  credential: admin.applicationDefault(),
});
const db = firestore.getFirestore();
// admin.initializeApp({
//   credential: admin.cert({
//     clientEmail: functions.config().client.email,
//     projectId: functions.config().project.id,
//     privateKey: functions.config().private.key.replace(/\\n/g, "\n"),

//   }),
//   databaseURL: "https://jobCompass.firebaseio.com",
// });

// const db = firestore.getFirestore();

export {admin, db};
