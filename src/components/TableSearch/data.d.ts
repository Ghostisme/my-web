export interface Props {
  list: DataType[];
  search: FormInstance<any> | undefined;
  onSearch: (values: any) => void;
  onReset: (event: MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface StatusList {
  title: string;
  value: number;
}

// export interface DataType {
//   key: React.Key;
//   type: string;
//   id: string | number;
//   name: string;
//   createTime?: string;
//   updateTime?: string;
//   status?: number | string;
//   link: string;
// }
export interface DataType {
  name: string;
  type: string;
  placeholder?: string;
  allowClear?: boolean;
  optionsList?: StatusItem[];
}
export type StatusItem = {
  title: string;
  value: number;
};
