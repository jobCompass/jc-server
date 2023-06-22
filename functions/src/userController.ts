import {Response} from "express";
import {db} from "./fbconfig";
import {UserType} from "./prototypes";

type Request = {
  body: UserType,
  params: { userId: string}
};

// const checkUser = async(req:Request, res:Response) => {
//   const
// };
const addUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const addRes = await db.collection("users").add(newUser);
    console.log("id", addRes.id);
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
  const {userId} = req.params;
  const user = req.body;
  console.log("in getUser", userId);
  console.log('in geUser user', user);

  // const q = query(collection(db, "users"), where("uid", "==", user.uid));
  // const docs = await getDocs(q);
  // if (docs.docs.length === 0) {
  //   await addDoc(collection(db, "users"), {
  //     uid: user.uid,
  //     name: user.displayName,
  //     authProvider: "google",
  //     email: user.email,
  //   });
  // }
  const logedUser = db.collection("users");
  const q =await logedUser.where('id', '==', userId).get();
  console.log('q', q.docs);
  if (q.docs.length === 0) {
    console.log('nope')
    res.status(204).send('newUser')
  } else {
    res.status(200).json(q);
  }

};


const helloWorld = async (request: Request, response:Response) => {
  console.log("hello from jobcompass");
  response.send("Hello from our server Firebase!");
};
export {addUser, getUser, helloWorld};
