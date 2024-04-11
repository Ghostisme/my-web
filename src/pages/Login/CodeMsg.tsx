import React from 'react';

const CodeMsg = (props: any) => {
  return (
    <div className='code-modal'>
      【RichSystem】验证码{props.number}
      ，您正在用Rich的后台系统，如非本人操作，请联系Rich本人。请勿在任何短信或邮件链接的页面中输入验证码！
    </div>
  );
};

export default CodeMsg;
