import { DataPreviewType } from "../../config/types/commonTypes";
import { UserInfo } from "../../config/types/userTypes";
import { delay } from "../utilities/common-utility";

export const getUserProfile = (uuid: string): Promise<UserInfo> => {
  const user = {
    id: uuid,
    userName: "admin",
    pwd: "",
    fullName: "shir hirsh",
    mail: "shirhirsh510@gmail.com",
    phone: "0503403413",
    credits: 830,
    role: undefined,
  };
  return delay(user);
};

export const getUserExpenses = (uuid: string): Promise<DataPreviewType> => {
  console.log(uuid);

  const data = [
    {
      title: "שיר 1",
      total: 100,
      value: 23,
    },
    {
      title: "שיר 2",
      total: 100,
      value: 78,
    },
    {
      title: "שיר 3",
      total: 100,
      value: 92,
    },
  ];
  return delay(data);
};

export const getUserCategories = (uuid: string): Promise<DataPreviewType> => {
  console.log(uuid);

  const data = [
    {
      title: "אלעד",
      total: 100,
      value: 54,
    },
    {
      title: "תמיד",
      total: 100,
      value: 54,
    },
    {
      title: "מאחר",
      total: 100,
      value: 54,
    },
    {
      title: "ואוהב",
      total: 100,
      value: 54,
    },
    {
      title: "לשקר",
      total: 100,
      value: 30,
    },
    {
      title: "שלא",
      total: 100,
      value: 70,
    },
  ];

  return delay(data);
};
