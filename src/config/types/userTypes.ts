export type Supplier = {
  products: Array<number>;
};

export type JWT = {
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

export type UserInfo = {
  user: string;
  pwd: string;
  mail: string;
  address: string;
  phone: string;
};
