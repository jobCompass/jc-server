import {Response} from "express";
import {db} from "./fbconfig";
// import {UserType} from "./prototypes";
type GoogleUserType = {
  uid: string,
  email: string,
  displayName: string,
  photoURL?: string,
}
type Request = {
  body: GoogleUserType,
  params: { userId: string}
};

const userObj= (userInfo: GoogleUserType, provider:string) => {
  const {uid, email, displayName, photoURL} = userInfo;
  const [firstname, lastname] = displayName.split(" ");
  return {
    uid: uid,
    personal_info: {
      first_name: firstname,
      last_name: lastname,
      email: email,
      authProvider: provider,
      photoURL: photoURL,
    },
    custom_list: null,
  };
};

const addUser = async (req: Request, res: Response) => {
  const userInfo = req.body;
  const newUser = userObj({...userInfo, photoURL: ""}, "local");
  try {
    const addRes = await db.collection("users").doc(newUser.uid).set(newUser);
    if (addRes) {
      res.status(201).send({
        status: "sucess",
        message: "user added successully",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  const {userId} = req.params;
  const {email, displayName, photoURL} = req.body;
  console.log("in getUser", userId);
  const logedUser = db.collection("users");
  try {
    const q = await logedUser.doc(userId).get();
    if (!q.exists) {
      console.log("not exists");
      const newUser = userObj({
        uid: userId, email, displayName, photoURL,
      }, "google");
      const addRes = await db.collection("users").doc(userId).set(newUser);
      if (addRes) {
        res.status(201).send(newUser);
      }
    } else {
      res.status(200).send(q.data());
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const helloWorld = async (request: Request, response:Response) => {
  console.log("hello from jobcompass");
  response.send("Hello from our server Firebase!");
};
export {addUser, getUser, helloWorld};
