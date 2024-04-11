import type { ModalProps } from 'antd';
export type ModalSetting = {} & ModalProps;
export interface ModalPropsType {
  option: ModalSetting;
  modalForm?: FormInstance<{
    username: string;
    password: string;
    mobile: string;
    email: string;
  }>;
}
