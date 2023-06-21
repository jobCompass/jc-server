import { Response } from "express";
import {db} from "./fbconfig";


type Request = {
  body: UserType,
  query: { userId: string}
}

const addUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const addRes = await db.collection("users").add(newUser);
    console.log("id", addRes.id, addRes.jobs);
    res.status(201).send({
      status: "sucess",
      message: "user added successully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.query;
  console.log("in getUser", userId);
  const logedUser = await db.collection("users").doc(userId).get();
  console.log(logedUser.data());
  res.status(200).json(logedUser.data());
};

// const getUser = async (req: Request, res: Response) => {
//   try {
//     const allUsers = await db.collection("users").get();
//     // const resData = new Map();
//     // allUsers.forEach((user) => {
//     //   console.log(user.id, "=>", user.data());
//     //   resData.set(user.id, user.data());
//     // });
//     console.log(allUsers);
//     res.status(200).json(allUsers);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
const helloWorld = async(request: Request, response:Response) => {

  console.log("hello from jobcompass");
  response.send("Hello from our server Firebase!");
};
export {addUser, getUser, helloWorld};
