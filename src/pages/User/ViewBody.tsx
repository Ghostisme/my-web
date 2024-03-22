import React from 'react';
import type User from '@/apis/user/index.d';

const ViewBody = (props: User.UserInfo) => {
  console.log(props, 'ViewBody');
  return <div></div>;
};

export default ViewBody;
