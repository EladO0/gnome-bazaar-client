export type Props = {
  [key: string | number]: any;
};

export type navigationRoute = {
  url: string;
  title: string;
  Icon: any;
};

export type navigationRoutes = Array<navigationRoute>;



export type dataPreviewType = Array<{
  title: string,
  value: number,
  total: number
}>