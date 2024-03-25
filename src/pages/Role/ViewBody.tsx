import React from 'react';
import type * as DataType from './data.d';

const ViewBody = (props: DataType.ModalPropsType) => {
  console.log(props, 'ViewBody');
  return <div className='modal-body'></div>;
};

export default ViewBody;
