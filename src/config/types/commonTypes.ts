import { Category } from "./marketTypes";
import { JWT } from "./userTypes";

export type Props = {
  [key: string | number]: any;
};

export type NavigationRoute = {
  url: string;
  title: string;
  Icon: any;
  hasAccess: (auth: JWT) => boolean;
};

export type NavigationRoutes = Array<NavigationRoute>;

export type DataPreviewType = Array<{
  title: string;
  value: number;
  total: number;
}>;

export type TableConfiguration = Array<{
  header: string;
  getter: (entry: any) => any;
  flex: number;
}>;

export type SalesData = {
  date: Date;
  close: number;
};

export type FiltersType = {
  searchTerm: string;
  category: Category | undefined
};
