import { Timestamp } from "firebase-admin/firestore";

type JobType = {
  title: string,
  company: string,
  type: string,
  location: string | null,
  note: string | null,
  status: string,
  url:string,
  timeline:Map<string, Timestamp>
};

type UserType = {
  id: string | null,
  personal_info: {
    first_name: string,
    last_name: string,
    email: string
  },
  custom_list: Array<string> | null,
}

export {JobType, UserType};


