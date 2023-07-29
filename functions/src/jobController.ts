import {Response} from "express";
import {db} from "./fbconfig";
import {JobType} from "./prototypes";
// import { FieldValue } from "firebase-admin/firestore";
// import { FieldValue} from "@google-cloud/firestore";
type Request = {
  body?: JobType,
  params: { userId: string, jobId: string}
}

const getJob = async (req: Request, res:Response) => {
  const {userId} = req.params;
  console.log("userid in getJob", userId);
  try {
    const snapshot = await db.collection("users")
      .doc(userId)
      .collection("jobs")
      .get();
    const allJobs:Array<any> = [];
    snapshot.forEach((doc) => {
      allJobs.push({...doc.data(), id: doc.id});
    });
    console.log(allJobs);
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addJob = async (req: Request, res:Response) => {
  const newJob = req.body;
  const {userId} = req.params;
  if (newJob) {
    db.collection("users")
      .doc(userId)
      .collection("jobs")
      .add(newJob)
      .then((ref) => {
        return {...newJob, id: ref.id};
      })
      .then((addedJob) => {
        res.status(201).send({
          status: "success",
          message: "add one new job",
          data: addedJob,
        });
      })
      .catch((error) => res.status(500).json(error));
  }
};
const updateJob = async (req: Request, res: Response) => {
  const job = req.body;
  // const newStatus = job.status
  if (job) {
    delete job.id;
    const {userId, jobId} = req.params;

    db.collection("users")
      .doc(userId)
      .collection("jobs")
      .doc(jobId)
      .update(job)
      .then(() => res.status(200).send("updated!"))
      .catch((err) => res.status(500).json(err));
  }
};

const deleteJob = (req: Request, res: Response) => {
  const {userId, jobId} = req.params;
  db.collection("users")
    .doc(userId)
    .collection("jobs")
    .doc(jobId)
    .delete()
    .then(() => res.status(200).send("deleted"))
    .catch((err) => res.status(500).json(err));
};

export {getJob, addJob, updateJob, deleteJob};
