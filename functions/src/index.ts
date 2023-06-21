/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
//import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript


// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as express from 'express';
import * as cors from "cors";
import { addUser, getUser, helloWorld} from "./userController";
import {getJob, addJob} from './jobController';
const app = express();
app.use(cors({origin: true}));
app.use(express.json());


app.get("/", helloWorld);
app.get("/user", getUser);//need pass query {userId: id} in request
app.post("/user", addUser);//need pass some content in body

app.post('/:userId/addjob', addJob);
app.get('/:userId/getjob', getJob);
app.put('/:userId/updatejob')
app.delete('/:userId/deletejob');
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   console.log("hello from jobcompass");
//   response.send("Hello from our server Firebase!");
// });
exports.app= onRequest(app);
