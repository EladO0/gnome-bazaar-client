export type Supplier = {
  products: Array<number>;
};

export type JWT = {
  uuid: string,
  token: string;
  name: string;
  expiry: Date;
  isSupplier: Supplier | false;
  isAdmin: boolean;
};

export type Credentials = {
  user: string;
  pwd: string;
};

export type Role = "Admin" | "Supplier" | "User" | undefined;

export type UserInfo = {
  id: string,
  user: string;
  pwd: string;
  mail: string;
  fullName: string;
  phone: string;
  credits: number;
  role: Role
};
