import { Response } from "express";
import {db} from "./fbconfig";
import {JobType } from './prototypes';
// import { FieldValue} from '@google-cloud/firestore';
type Request = {
  body: JobType,
  params: { userId: string, jobIndex: Number}
}

const getJob = async (req: Request, res:Response) => {
  const {userId} = req.params;
  console.log('userid in getJob', userId);
  try{
    const snapshot = await db.collection("users").doc(userId).collection("jobs").get();
    let allJobs:Array<any> = [];
    snapshot.forEach(doc => allJobs.push(doc.data()));
    console.log(allJobs);
    res.status(200).json(allJobs);
  } catch(error) {
    res.status(500).json(error);
  }
};

const addJob = async (req: Request, res:Response) => {
  let newJob = req.body;
  const {userId} = req.params;
  try {
    const addOne =await db.collection("users").doc(userId).collection("jobs").add(newJob);
    res.status(201).send({
      status:'success',
      message:'add one new job',
      data: addOne
    })
  } catch(error) {
    res.status(500).json(error);
  }
}
// const updateJob = async (req: Request, res: Response) => {
//   const newJob = req.body;
//   const {userId, jobIndex} = req.params;
//   try {
//     const snapshot = await db.collection("users").doc(userId).collection("jobs").get();
//     let result;
//     let sendMessage = {status:0, message: '', data: result};
//     if (!jobIndex) {
//       result = await logedUser.update({jobs: FieldValue.arrayUnion(newJob)});
//       sendMessage.status = 201;
//       sendMessage.message = "add one job";
//     } else if (jobIndex === -1) {
//       result = await logedUser.update({jobs: FieldValue.arrayRemove(newJob)});
//       sendMessage.status = 203
//       sendMessage.message = "delete one job"
//     } else {
//       result = await logedUser.update({jobs: newJob});
//     }

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// const updateJob = async (req: Request, res: Response) => {
//   const { userId, jobIndex } = req.query;
//   console.log("in updateJob",userId, jobIndex);
//   const logedUser = db.collection("users").doc(userId).get();

//   res.status(200).json(logedUser.data());
// };

export {getJob, addJob};
