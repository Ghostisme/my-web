import React from 'react';
import { Modal } from 'antd';

const AlertComp = (props: any) => {
  // console.log('通用弹窗', props);
  const {
    isOpen,
    title,
    width,
    maskClosable,
    children,
    handleOk,
    handleCancel,
  } = props;
  return (
    <Modal
      open={isOpen}
      title={title}
      width={width}
      maskClosable={maskClosable}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default AlertComp;
