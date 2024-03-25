import type Role from '@/apis/role/index.d';
export type BtnType = 'create' | 'view' | 'update' | 'del';
export type ModalSetting = {
  type: BtnType;
} & ModalProps;
export interface DataType {
  key: React.Key;
  id: string | number;
  name: string;
  createTime: string;
  updateTime: string;
  status: number | string;
  link: string;
}

export interface ModalPropsType {
  row: Role.RoleInfo;
  option: ModalSetting;
}
