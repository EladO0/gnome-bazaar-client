export type Supplier = {
  products: Array<number>;
};

export type JWT = {
  hash: string | null;
  name: string;
  expiry: Date | null;
  isSupplier: Supplier | boolean;
  isAdmin: boolean;
};
