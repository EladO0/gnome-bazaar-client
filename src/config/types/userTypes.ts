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
