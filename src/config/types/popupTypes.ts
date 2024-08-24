import { Props } from "./commonTypes";

export type PopupState = {
  component: ((props: any) => JSX.Element) | null;
  props: Props;
};
