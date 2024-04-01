export interface Props {
  list: DataType[];
  search: FormInstance<any> | undefined;
  onSearch: Function;
  onReset: Function;
}

export interface StatusList {
  title: string;
  value: number;
}

export interface DataType {
  key: React.Key;
  id: string | number;
  name: string;
  createTime: string;
  updateTime: string;
  status: number | string;
  link: string;
}
