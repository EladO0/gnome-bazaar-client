import { SalesData } from "../../config/types/commonTypes";
import { UserInfo } from "../../config/types/userTypes";
import {
  delay,
  randomBetween,
  randomRole,
  randomString,
} from "../utilities/common-utility";

export const getAllUsers = async (n: number = 10): Promise<Array<UserInfo>> => {
  const users: Array<UserInfo> = [];
  for (let i = 0; i < n; i++) {
    const user: UserInfo = {
      id: i.toString(),
      credits: randomBetween(100, 300),
      fullName: randomString(8),
      mail: `user${i}@gmail.com`,
      phone: `054883${randomBetween(100, 300)}`,
      pwd: "",
      role: randomRole(),
      userName: randomString(5) + i,
    };
    users.push(user);
  }

  return delay(users);
};

export const getIncomeData = async (): Promise<Array<SalesData>> => {
  const data = [
    { date: new Date(2024, 3, 1), close: 1000 },
    { date: new Date(2024, 4, 1), close: 500 },
    { date: new Date(2024, 5, 1), close: 170 },
    { date: new Date(2024, 6, 1), close: 170 },
    { date: new Date(2024, 7, 1), close: 170 },
  ];
  return delay(data);
};
