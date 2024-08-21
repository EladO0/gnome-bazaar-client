import { Props } from "./types";

export type PopupState = {
  component: ((props: any) => JSX.Element) | null;
  props: Props;
};
